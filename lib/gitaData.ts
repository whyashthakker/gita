import { GitaData } from '@/types/gita';
import fs from 'fs';
import path from 'path';

export function readGitaData(): GitaData {
  const filePath = path.join(process.cwd(), 'lib/bhagavad_gita.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as GitaData;
}