// 0
export const reverse = (text: string) =>
    [...text].reverse().join('');

// 1
export const odds = (text: string) =>
    [...text].filter((_, i) => !(i & 1)).join('');

// 2
export const zip = (text0: string, text1: string) =>
    [...text0].map((s, i) => `${s}${text1[i]}`).join('');

// 3
export const pi = (text: string) =>
    text.split(/\W/).filter(Boolean).map(s => s.length);

// 4
export function elements(text: string) {
    const singleCharIndices = [1, 5, 6, 7, 8, 9, 15, 16, 19];
    const entries = text.split(' ').map((s, i) => [
        singleCharIndices.includes(i + 1) ? s[0] : s[0] + s[1],
        i + 1
    ] as [string, number]);
    return new Map<string, number>(entries);
}

// 5
export function* ngram(text: string, count: number, delimiter: string = '') {
    const ary = text.split(delimiter);
    for (let i = 0; i + count <= ary.length; i++) {
        yield ary.slice(i, i + count).join(delimiter);
    }
}

// 6
export const set = {
    union<T>(x: Set<T>, y: Set<T>) {
        return new Set<T>([...x, ...y]);
    },
    intersect<T>(x: Set<T>, y: Set<T>) {
        const result = new Set<T>();
        x.forEach(v => { if (y.has(v)) result.add(v); });
        return result;
    },
    diff<T>(x: Set<T>, y: Set<T>) {
        const result = new Set<T>(x);
        y.forEach(w => result.delete(w));
        return result;
    }
};

// 7
export const template = (x: unknown, y: unknown, z: unknown) =>
    `${x}時の${y}は${z}`;

// 8
export const cipher = (text: string) => [...text]
    .map(s => /[a-z]/.test(s) ? String.fromCharCode(219 - s.charCodeAt(0)) : s).join('')

// 9
export const typoglycemia = (text: string) =>
    text.split(' ').map(s => {
        if (s.length <= 4) return s;
        return [
            s[0],
            ...[].slice.call(s, 1, -1).sort(() => Math.random() - 0.5),
            s[s.length - 1]
        ].join('');
    }).join(' ');
