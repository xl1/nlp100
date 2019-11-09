const sp = (text: string) => text.split(/(?<=\n)/);

const select = (text: string, index: number) =>
    sp(text).map(line => line.split('\t')[index] + '\n');

// 10
export const countLines = (text: string) => sp(text).length;

// 11
export const tabToSpace = (text: string) => text.replace(/\t/g, ' ');

// 12
export const selectColumn = (text: string, index: number) =>
    select(text, index).join('');

// 13
export function merge(left: string, right: string) {
    const l = sp(left);
    const r = sp(right);
    return l.map((s, i) => `${s.trimRight()}\t${r[i].trimRight()}\n`).join('');
}

// 14
export const head = (text: string, count: number) =>
    sp(text).slice(0, count).join('');

// 15
export const tail = (text: string, count: number) =>
    sp(text).slice(-count).join('');

// 16
export function* split(text: string, count: number) {
    const lines = sp(text);
    const unit = Math.ceil(lines.length / count);
    for (let i = 0; i < count; i++) {
        yield lines.slice(i * unit, i * unit + unit).join('');
    }
}

// 17
export const uniq = (text: string, index: number) =>
    [...new Set(select(text, index))].sort().join('');

// 18
export const numSort = (text: string, index: number) =>
    sp(text)
        .map(line => [line.split('\t')[index], line])
        .sort(([a], [b]) => +b - +a)
        .map(([_, line]) => line)
        .join('');

// 19
export function freqSort(text: string, index: number) {
    const map = new Map<string, number>();
    for (const s of select(text, index))
        map.set(s, 1 + (map.get(s) || 0));
    return [...map]
        .sort(([s, v], [t, w]) => (w - v) || t.localeCompare(s))
        .map(([key]) => key)
        .join('');
};
