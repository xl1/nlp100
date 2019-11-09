import { createReadStream } from 'fs';
import { createUnzip } from 'zlib';
import split2 from 'split2';
import fetch from 'node-fetch';

interface Article {
    title: string;
    text: string;
}

// 20
export function search(path: string, query: string) {
    return new Promise<string | undefined>((resolve, reject) => {
        createReadStream(path)
            .pipe(createUnzip())
            .pipe(split2(JSON.parse))
            .on('data', (article: Article) => {
                if (article.title === query) resolve(article.text);
            })
            .on('error', reject)
            .on('close', () => resolve(undefined));
    });
}

const matchAll = (text: string, re: RegExp, index: number): string[] =>
    [...text.matchAll(re)].map(a => a[index]);

// 21
export const extCategoryLines = (text: string) =>
    matchAll(text, /^\[\[Category:.+\]\]/gm, 0);

// 22
export const extCategoryNames = (text: string) =>
    matchAll(text, /^\[\[Category:(.+)(\|.*)?\]\]/gm, 1);

// 23
interface Section {
    name: string;
    level: number;
}

export function* extSections(text: string): IterableIterator<Section> {
    for (const [, prefix, name] of text.matchAll(/(==+)(.+)\1/g))
        yield { name, level: prefix.length - 1 };
}

// 24
export const extFiles = (text: string) =>
    matchAll(text, /(File|ファイル):(.+?)\|/g, 2);

// 25
export function extTemplate(text: string): Map<string, string> {
    const result = new Map<string, string>();
    const start = text.search(/^\{\{基礎情報/m);
    const end = text.search(/^\}\}/m);
    text.slice(start, end)
        .split(/\|(?=.+? = )/)
        .forEach(str => {
            const m = /(.+) = (.+)/s.exec(str);
            if (m) result.set(m[1], m[2]);
        });
    return result;
}

// 26
export const mapValue =
    <TKey, TValue, TResult>(map: Map<TKey, TValue>, func: (x: TValue) => TResult) =>
    new Map<TKey, TResult>([...map].map(([key, value]) => [key, func(value)]));

export const removeEmphasis = (text: string) =>
    text.replace(/'{2,3}/g, '');

// 27
export const removeLinks = (text: string) =>
    text.replace(/\[\[(.+?\|)?(.+?)\]\]/g, '$2');

// 28
// TODO
export const removeMarkup = (text: string) =>
    text;

// 29
interface ImageInfoQueryResult {
    query: {
        pages: {
            [key: number]: {
                title: string,
                imageinfo: {
                    url: string
                }[]
            }
        }
    }
};

export async function getFlagUrl(map: Map<string, string>) {
    const title = map.get('国旗画像')!;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&titles=File:${encodeURIComponent(title)}&iiprop=url`;
    const data: ImageInfoQueryResult = await fetch(url).then(r => r.json());
    return Object.entries(data.query.pages)[0][1].imageinfo[0].url;
}
