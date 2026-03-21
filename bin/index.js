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
const nc = !process.env.NO_COLOR;
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

function info(msg) {
  console.log(`${c.dim}  ${msg}${c.reset}`);
}

// Preflight checks
function preflight() {
  // Platform
  const p = platform();
  if (p !== 'darwin' && p !== 'linux') {
    fail(`NOESIS requires macOS or Linux. Detected: ${p}`);
  }

  // Node.js >= 18
  const nodeVersion = parseInt(process.version.slice(1));
  if (nodeVersion < 18) {
    fail(`Node.js 18+ required. You have ${process.version}`);
  }
  ok(`Node.js ${process.version}`);

  // Claude CLI
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

  // Install
  console.log(`\n${c.bold}Installing NOESIS${c.reset}`);

  // Copy template
  mkdirSync(dest, { recursive: true });
  cpSync(TEMPLATE_DIR, dest, { recursive: true });
  ok('Vault structure created (USER.ENV / SHARED.ENV / AI.ENV)');

  // Make scripts executable
  const scriptsDir = join(dest, 'scripts');
  if (existsSync(scriptsDir)) {
    try {
      const scripts = readdirSync(scriptsDir).filter(f => f.endsWith('.sh'));
      for (const script of scripts) {
        chmodSync(join(scriptsDir, script), 0o755);
      }
      ok(`${scripts.length} scripts made executable`);
    } catch (err) {
      info(`Could not chmod scripts: ${err.message}`);
    }
  }

  // Count skills
  const skillsDir = join(dest, '.claude', 'skills');
  let skillCount = 0;
  if (existsSync(skillsDir)) {
    try {
      skillCount = readdirSync(skillsDir).filter(d => {
        return existsSync(join(skillsDir, d, 'SKILL.md'));
      }).length;
    } catch {}
  }

  ok(`${skillCount} skills installed`);
  ok('4 background agent templates ready');
  ok('2 subagents configured');

  // Summary
  console.log(`
${c.green}${c.bold}✓ NOESIS installed to ${dest}${c.reset}

  Your system is ready:
  ${c.dim}•${c.reset} Vault: USER.ENV / SHARED.ENV / AI.ENV
  ${c.dim}•${c.reset} ${skillCount} skills: /bonjour /status /recap /sync /task /deepwork /profile-deep
  ${c.dim}•${c.reset} 4 background agents (configured during setup)
  ${c.dim}•${c.reset} Gamification with 18 levels

${c.bold}Next:${c.reset}

  ${c.cyan}cd ${dest} && claude${c.reset}

  The setup agent will personalize your system:
  profile, projects, voice analysis, background agents, and your system's name.
`);
}

main().catch((err) => {
  console.error(`\n${c.red}Error: ${err.message}${c.reset}`);
  process.exit(1);
});
