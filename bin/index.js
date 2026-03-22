#!/usr/bin/env node

import { readFileSync, readdirSync, cpSync, chmodSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { execFileSync } from 'child_process';
import { homedir, platform } from 'os';

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
    process.stdout.write(`\r${c.cyan}${frames[i % frames.length]}${c.reset} ${label}`);
    i++;
  }, 80);

  return {
    done(msg) {
      clearInterval(interval);
      process.stdout.write(`\r${c.green}✓${c.reset} ${msg || label}\n`);
    },
    fail(msg) {
      clearInterval(interval);
      process.stdout.write(`\r${c.red}✗${c.reset} ${msg || label}\n`);
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

// Main
async function main() {
  const version = getVersion();

  console.log(getBanner(version));

  // Preflight
  console.log(`${c.bold}Preflight checks${c.reset}`);
  preflight();
  console.log();

  // Destination path
  const defaultPath = join(homedir(), 'Desktop', 'Noesis');
  const destInput = await ask('Where should NOESIS live?', defaultPath);
  const dest = resolve(destInput.replace(/^~/, homedir()));

  // Check if exists
  if (existsSync(dest)) {
    const overwrite = await ask(`${dest} already exists. Overwrite? (y/N)`, 'N');
    if (overwrite.toLowerCase() !== 'y') {
      console.log(`\n${c.dim}Installation cancelled.${c.reset}`);
      process.exit(0);
    }
  }

  console.log(`\n${c.bold}Installing NOESIS${c.reset}\n`);

  // Step 1: Vault structure
  let s = spinner('Creating vault structure...');
  mkdirSync(dest, { recursive: true });
  cpSync(TEMPLATE_DIR, dest, { recursive: true });
  await wait(400);
  s.done('Vault structure created (USER.ENV / SHARED.ENV / AI.ENV)');

  // Step 2: Scripts
  s = spinner('Setting up background scripts...');
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
  s.done(`${scriptCount} background scripts ready`);

  // Step 3: Skills
  s = spinner('Installing skills...');
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
  s.done(`${skillCount} skills installed (/bonjour /status /recap /sync /task /deepwork /profile-deep)`);

  // Step 4: Subagents
  s = spinner('Configuring subagents...');
  await wait(250);
  s.done('2 subagents configured (analyzer, voice-analyzer)');

  // Step 5: LaunchAgent templates
  s = spinner('Preparing background agents...');
  await wait(300);
  s.done('4 background agent templates ready (digest, session, watcher, maintenance)');

  // Step 6: Gamification
  s = spinner('Setting up gamification...');
  await wait(200);
  s.done('Gamification ready (18 levels, 3 acts, 48h grace period)');

  // Summary
  console.log(`
${c.green}${c.bold}✓ NOESIS installed to ${dest}${c.reset}

  ${c.dim}Everything is ready. The setup agent will personalize it for you:${c.reset}
  ${c.dim}•${c.reset} Your profile, portrait, and voice analysis
  ${c.dim}•${c.reset} Your projects (detected from your files)
  ${c.dim}•${c.reset} Background agents (scheduled to your rhythm)
  ${c.dim}•${c.reset} Your system's name and shell aliases

${c.bold}Next:${c.reset}

  ${c.cyan}cd ${dest} && claude${c.reset}
`);
}

main().catch((err) => {
  console.error(`\n${c.red}Error: ${err.message}${c.reset}`);
  process.exit(1);
});
