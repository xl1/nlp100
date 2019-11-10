import { createReadStream } from 'fs';
import split2 from 'split2';
import { join } from 'path';

export interface Token {
    surface: string;
    base: string;
    pos: string;
    pos1: string;
}

// mecab neko.txt > neko.txt.mecab
export function load(path: string) {
    return new Promise<Token[]>((resolve, reject) => {
        const result: Token[] = [];
        createReadStream(path)
            .pipe(split2())
            .on('data', (line: string) => {
                const [surface, data] = line.split('\t');
                if (data) {
                    const [pos, pos1, pos2, pos3, conjType, conjForm, base] = data.split(',');
                    result.push({ surface, base, pos, pos1 });
                }
            })
            .on('end', () => resolve(result))
            .on('error', reject);
    });
}

export async function main() {
    const filePath = join(__dirname, '../assets/neko.txt.mecab');
    const tokens = await load(filePath);

    console.log(31, tokens.filter(t => t.pos === '動詞').map(t => t.surface));

    console.log(32, tokens.filter(t => t.pos === '動詞').map(t => t.base));

    console.log(33, tokens
        .filter(t => t.pos === '名詞' && t.pos1 === 'サ変接続')
        .map(t => t.surface));

    const AnoB: string[] = [];
    tokens.forEach((t, i) => {
        if (t.pos === '名詞') {
            const u = tokens[i + 1];
            const v = tokens[i + 2];
            if (u && u.surface === 'の' && v && v.pos === '名詞')
                AnoB.push(`${t.surface}の${v.surface}`);
        }
    });
    console.log(34, AnoB);

    const junctions: string[] = [];
    let junction: string[] = [];
    for (const t of tokens) {
        if (t.pos === '名詞') {
            junction.push(t.surface);
        } else {
            if (junction.length >= 2) {
                junctions.push(junction.join(''));
            }
            junction = [];
        }
    }
    console.log(35, junctions);

    const map = new Map<string, number>();
    for (const t of tokens)
        map.set(t.surface, 1 + (map.get(t.surface) || 0));
    const ranking = [...map].sort(([s, v], [t, w]) => w - v);
    const length = ranking.length;
    console.log(36, ranking.map(([key]) => key));
}

if (!module.parent) {
    main().catch(console.error);
}
