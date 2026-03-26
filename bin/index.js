#!/usr/bin/env node

import { readFileSync, readdirSync, cpSync, chmodSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { execFileSync } from 'child_process';
import { homedir, platform } from 'os';

// Detect system language (macOS: AppleLanguages, Linux: $LANG)
function getSystemLang() {
  try {
    if (platform() === 'darwin') {
      const out = execFileSync('defaults', ['read', '-g', 'AppleLanguages'], { encoding: 'utf8' });
      const match = out.match(/"?([a-z]{2})/i);
      if (match) return match[1].toLowerCase();
    }
  } catch {}
  const lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || '';
  const match = lang.match(/^([a-z]{2})/i);
  return match ? match[1].toLowerCase() : 'en';
}

// i18n strings
const strings = {
  en: {
    preflight: 'Preflight checks',
    whereLive: 'Where should NOESIS live?',
    choices: ['Desktop/Noesis', 'Documents/Noesis', 'Custom path'],
    chooseLocation: 'Choose a location:',
    customPath: 'Enter path:',
    alreadyExists: 'already exists. Overwrite? (y/N)',
    cancelled: 'Installation cancelled.',
    installing: 'Installing NOESIS',
    creatingVault: 'Creating vault structure...',
    vaultDone: 'Vault structure created (USER.ENV / SHARED.ENV / AI.ENV)',
    settingScripts: 'Setting up background scripts...',
    scriptsDone: (n) => `${n} background scripts ready`,
    installingSkills: 'Installing skills...',
    skillsDone: (n) => `${n} skills installed (/bonjour /status /recap /sync /task /deepwork /profile-deep)`,
    configuringSubs: 'Configuring subagents...',
    subsDone: '2 subagents configured (analyzer, voice-analyzer)',
    preparingAgents: 'Preparing background agents...',
    agentsDone: '4 background agent templates ready (digest, session, watcher, maintenance)',
    settingGamif: 'Setting up gamification...',
    gamifDone: 'Gamification ready (18 levels, 3 acts, 48h grace period)',
    installedTo: (dest) => `NOESIS installed to ${dest}`,
    setupWill: 'Everything is ready. The setup agent will personalize it for you:',
    setupItems: [
      'Your profile, portrait, and voice analysis',
      'Your projects (detected from your files)',
      'Background agents (scheduled to your rhythm)',
      "Your system's name and shell aliases",
    ],
    next: 'Next:',
    copied: 'Copied to clipboard — just paste and press Enter.',
    sayHello: 'Then just say hello — the setup agent will guide you from there.',
  },
  fr: {
    preflight: 'Vérifications préliminaires',
    whereLive: 'Où installer NOESIS ?',
    choices: ['Desktop/Noesis', 'Documents/Noesis', 'Chemin personnalisé'],
    chooseLocation: 'Choisir un emplacement :',
    customPath: 'Entrer le chemin :',
    alreadyExists: 'existe déjà. Écraser ? (o/N)',
    cancelled: 'Installation annulée.',
    installing: 'Installation de NOESIS',
    creatingVault: 'Création de la structure vault...',
    vaultDone: 'Structure vault créée (USER.ENV / SHARED.ENV / AI.ENV)',
    settingScripts: 'Configuration des scripts...',
    scriptsDone: (n) => `${n} scripts prêts`,
    installingSkills: 'Installation des skills...',
    skillsDone: (n) => `${n} skills installés (/bonjour /status /recap /sync /task /deepwork /profile-deep)`,
    configuringSubs: 'Configuration des subagents...',
    subsDone: '2 subagents configurés (analyzer, voice-analyzer)',
    preparingAgents: 'Préparation des agents de fond...',
    agentsDone: '4 agents de fond prêts (digest, session, watcher, maintenance)',
    settingGamif: 'Configuration de la gamification...',
    gamifDone: 'Gamification prête (18 niveaux, 3 actes, période de grâce 48h)',
    installedTo: (dest) => `NOESIS installé dans ${dest}`,
    setupWill: "Tout est prêt. L'agent de setup va tout personnaliser :",
    setupItems: [
      'Ton profil, portrait et analyse vocale',
      'Tes projets (détectés depuis tes fichiers)',
      'Les agents de fond (calés sur ton rythme)',
      'Le nom et les alias shell de ton système',
    ],
    next: 'Suite :',
    copied: 'Copié dans le presse-papiers — colle et appuie sur Entrée.',
    sayHello: "Puis dis simplement bonjour — l'agent de setup prend le relais.",
  },
  es: {
    preflight: 'Verificaciones previas',
    whereLive: '¿Dónde instalar NOESIS?',
    choices: ['Desktop/Noesis', 'Documents/Noesis', 'Ruta personalizada'],
    chooseLocation: 'Elige una ubicación:',
    customPath: 'Introduce la ruta:',
    alreadyExists: 'ya existe. ¿Sobrescribir? (s/N)',
    cancelled: 'Instalación cancelada.',
    installing: 'Instalando NOESIS',
    creatingVault: 'Creando estructura del vault...',
    vaultDone: 'Estructura del vault creada (USER.ENV / SHARED.ENV / AI.ENV)',
    settingScripts: 'Configurando scripts...',
    scriptsDone: (n) => `${n} scripts listos`,
    installingSkills: 'Instalando skills...',
    skillsDone: (n) => `${n} skills instalados (/bonjour /status /recap /sync /task /deepwork /profile-deep)`,
    configuringSubs: 'Configurando subagentes...',
    subsDone: '2 subagentes configurados (analyzer, voice-analyzer)',
    preparingAgents: 'Preparando agentes de fondo...',
    agentsDone: '4 agentes de fondo listos (digest, session, watcher, maintenance)',
    settingGamif: 'Configurando gamificación...',
    gamifDone: 'Gamificación lista (18 niveles, 3 actos, período de gracia 48h)',
    installedTo: (dest) => `NOESIS instalado en ${dest}`,
    setupWill: 'Todo listo. El agente de setup lo personalizará todo:',
    setupItems: [
      'Tu perfil, retrato y análisis vocal',
      'Tus proyectos (detectados en tus archivos)',
      'Agentes de fondo (ajustados a tu ritmo)',
      'El nombre y los alias shell de tu sistema',
    ],
    next: 'Siguiente:',
    copied: 'Copiado al portapapeles — pega y presiona Enter.',
    sayHello: 'Luego simplemente di hola — el agente de setup te guiará.',
  },
};

function t(lang) {
  return strings[lang] || strings.en;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_DIR = resolve(__dirname, '..', 'template');

// Colors (with NO_COLOR support)
const nc = !process.env.NO_COLOR && process.stdout.isTTY;
const c = {
  reset: nc ? '\x1b[0m' : '',
  bold: nc ? '\x1b[1m' : '',
  dim: nc ? '\x1b[2m' : '',
  green: nc ? '\x1b[32m' : '',
  cyan: nc ? '\x1b[36m' : '',
  yellow: nc ? '\x1b[33m' : '',
  red: nc ? '\x1b[31m' : '',
};

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
    return pkg.version;
  } catch {
    return '0.1.0';
  }
}

function getBanner(version) {
  try {
    const banner = readFileSync(resolve(__dirname, '..', 'assets', 'banner.txt'), 'utf8');
    return `${c.cyan}${banner}${c.reset}${c.dim}   v${version}${c.reset}\n`;
  } catch {
    return `${c.cyan}${c.bold}NOESIS${c.reset} ${c.dim}v${version}${c.reset}\n   Your cognitive operating system.\n`;
  }
}

function fail(msg) {
  console.error(`\n${c.red}✗ ${msg}${c.reset}\n`);
  process.exit(1);
}

function ok(msg) {
  console.log(`${c.green}✓${c.reset} ${msg}`);
}

// Animated spinner for a step
function spinner(label) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r\x1b[K${c.cyan}${frames[i % frames.length]}${c.reset} ${label}`);
    i++;
  }, 80);

  return {
    done(msg) {
      clearInterval(interval);
      process.stdout.write(`\r\x1b[K${c.green}✓${c.reset} ${msg || label}\n`);
    },
    fail(msg) {
      clearInterval(interval);
      process.stdout.write(`\r\x1b[K${c.red}✗${c.reset} ${msg || label}\n`);
    }
  };
}

// Delay helper
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Preflight checks
function preflight() {
  const p = platform();
  if (p !== 'darwin' && p !== 'linux') {
    fail(`NOESIS requires macOS or Linux. Detected: ${p}`);
  }

  const nodeVersion = parseInt(process.version.slice(1));
  if (nodeVersion < 18) {
    fail(`Node.js 18+ required. You have ${process.version}`);
  }
  ok(`Node.js ${process.version}`);

  try {
    execFileSync('which', ['claude'], { stdio: 'ignore' });
    ok('Claude CLI found');
  } catch {
    fail(`Claude CLI not found.\n\n  Install it: https://docs.anthropic.com/en/docs/claude-code\n\n  Then run this installer again.`);
  }
}

// Prompt user for input
function ask(question, defaultValue) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = defaultValue
      ? `${question} ${c.dim}(${defaultValue})${c.reset} `
      : `${question} `;
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

// Choose from numbered list
async function choose(question, options) {
  console.log(`\n${question}`);
  for (let i = 0; i < options.length; i++) {
    console.log(`  ${c.cyan}${i + 1}.${c.reset} ${options[i]}`);
  }
  const answer = await ask(`\n${c.dim}(1-${options.length})${c.reset}`, '1');
  const idx = parseInt(answer) - 1;
  return idx >= 0 && idx < options.length ? idx : 0;
}

// Main
async function main() {
  const version = getVersion();
  const lang = getSystemLang();
  const s18n = t(lang);

  console.log(getBanner(version));

  // Preflight
  console.log(`${c.bold}${s18n.preflight}${c.reset}`);
  preflight();
  console.log();

  // Destination path with choices
  const home = homedir();
  const pathOptions = [
    join(home, 'Desktop', 'Noesis'),
    join(home, 'Documents', 'Noesis'),
  ];

  const choice = await choose(s18n.chooseLocation, [
    ...s18n.choices.slice(0, 2).map((label, i) => `${label} ${c.dim}(${pathOptions[i]})${c.reset}`),
    s18n.choices[2],
  ]);

  let dest;
  if (choice < 2) {
    dest = pathOptions[choice];
  } else {
    const customInput = await ask(s18n.customPath);
    dest = resolve(customInput.replace(/^~/, home));
  }

  // Check if exists
  if (existsSync(dest)) {
    const confirmChar = lang === 'fr' ? 'o' : lang === 'es' ? 's' : 'y';
    const overwrite = await ask(`${dest} ${s18n.alreadyExists}`, 'N');
    if (overwrite.toLowerCase() !== confirmChar && overwrite.toLowerCase() !== 'y') {
      console.log(`\n${c.dim}${s18n.cancelled}${c.reset}`);
      process.exit(0);
    }
  }

  console.log(`\n${c.bold}${s18n.installing}${c.reset}\n`);

  // Step 1: Vault structure
  let s = spinner(s18n.creatingVault);
  mkdirSync(dest, { recursive: true });
  cpSync(TEMPLATE_DIR, dest, { recursive: true });
  await wait(400);
  s.done(s18n.vaultDone);

  // Step 2: Scripts
  s = spinner(s18n.settingScripts);
  const scriptsDir = join(dest, 'scripts');
  let scriptCount = 0;
  if (existsSync(scriptsDir)) {
    try {
      const scripts = readdirSync(scriptsDir).filter(f => f.endsWith('.sh'));
      for (const script of scripts) {
        chmodSync(join(scriptsDir, script), 0o755);
      }
      scriptCount = scripts.length;
    } catch {}
  }
  await wait(300);
  s.done(s18n.scriptsDone(scriptCount));

  // Step 3: Skills
  s = spinner(s18n.installingSkills);
  const skillsDir = join(dest, '.claude', 'skills');
  let skillCount = 0;
  if (existsSync(skillsDir)) {
    try {
      skillCount = readdirSync(skillsDir).filter(d => {
        return existsSync(join(skillsDir, d, 'SKILL.md'));
      }).length;
    } catch {}
  }
  await wait(350);
  s.done(s18n.skillsDone(skillCount));

  // Step 4: Subagents
  s = spinner(s18n.configuringSubs);
  await wait(250);
  s.done(s18n.subsDone);

  // Step 5: LaunchAgent templates
  s = spinner(s18n.preparingAgents);
  await wait(300);
  s.done(s18n.agentsDone);

  // Step 6: Gamification
  s = spinner(s18n.settingGamif);
  await wait(200);
  s.done(s18n.gamifDone);

  // Copy next command to clipboard
  const nextCmd = `cd ${dest} && claude`;
  try {
    if (platform() === 'darwin') {
      execFileSync('pbcopy', { input: nextCmd, stdio: ['pipe', 'ignore', 'ignore'] });
    } else {
      execFileSync('xclip', ['-selection', 'clipboard'], { input: nextCmd, stdio: ['pipe', 'ignore', 'ignore'] });
    }
  } catch {}

  const copied = s18n.copied || 'Copied to clipboard — just paste and press Enter.';

  // Summary
  const items = s18n.setupItems.map(item => `  ${c.dim}•${c.reset} ${item}`).join('\n');
  console.log(`
${c.green}${c.bold}✓ ${s18n.installedTo(dest)}${c.reset}

  ${c.dim}${s18n.setupWill}${c.reset}
${items}

${c.bold}${s18n.next}${c.reset}

  ${c.cyan}${nextCmd}${c.reset}
  ${c.dim}${copied}${c.reset}

  ${c.dim}${s18n.sayHello}${c.reset}
`);
}

main().catch((err) => {
  console.error(`\n${c.red}Error: ${err.message}${c.reset}`);
  process.exit(1);
});
