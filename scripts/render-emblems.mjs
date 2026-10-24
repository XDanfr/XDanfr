#!/usr/bin/env node
// Generate profile shape icons using Emblem's renderer; never draw the shapes here.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = resolve(process.argv[2] ?? '../Emblem/dist/cli.js');
const pack = join(root, 'assets/icons/pack.json');
const outDir = join(root, 'assets/emblems');
if (!existsSync(cli)) {
  console.error('Build the sibling Emblem checkout first, then pass its dist/cli.js as the argument.');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const icons = [
  ['kotlin', 'Kotlin', '6-sided-cookie', '#7F52FF'],
  ['flutter', 'Flutter', '4-leaf-clover', '#02569B'],
  ['cplusplus', 'C++', 'hexagon', '#00599C'],
  ['unrealengine', 'Unreal Engine', '7-sided-cookie', '#0E1128'],
  ['vite', 'Vite', 'soft-burst', '#646CFF'],
  ['html5', 'HTML5', '4-sided-cookie', '#E34F26'],
  ['css3', 'CSS3', '4-leaf-clover', '#1572B6'],
  ['javascript', 'JavaScript', '6-sided-cookie', '#F7DF1E'],
  ['npm', 'npm', '8-leaf-clover', '#CB3837'],
  ['php', 'PHP', 'oval', '#777BB4'],
  ['csharp', 'C#', '4-sided-cookie', '#68217A'],
  ['dotnet', '.NET', 'puffy-diamond', '#512BD4'],
  ['cachyos', 'CachyOS', 'hexagon', '#1DC7B5'],
  ['bash', 'Bash', 'pixel-circle', '#4EAA25'],
  ['python', 'Python', 'puffy', '#3776AB'],
  ['swift', 'Swift', 'very-sunny', '#F05138'],
  ['website', 'Website', '6-sided-cookie', '#49B885'],
  ['spotify', 'Spotify', '8-leaf-clover', '#1ED760'],
  ['soundcloud', 'SoundCloud', 'soft-burst', '#FF5500'],
];
for (const [slug, label, shape, seed] of icons) {
  const out = join(outDir, slug + '.svg');
  const args = [
    cli, 'badge', '', label,
    '--icons', pack,
    '--style', 'cookie',
    '--shape', shape,
    '--seed', seed,
    '--theme', 'light',
    '--font', 'roboto-flex',
    '--weight', 'bold',
    '--icon', slug,
    '--icon-size', '68',
    '--value-size', '26',
    '--outline', 'off',
    '--out', out,
  ];
  const run = spawnSync(process.execPath, args, { cwd: dirname(cli), encoding: 'utf8' });
  if (run.status !== 0) {
    console.error('Failed rendering ' + slug + ':\n' + (run.stderr || run.stdout || 'unknown error'));
    process.exit(run.status || 1);
  }
  console.log(out);
}
