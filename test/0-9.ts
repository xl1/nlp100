import { strict as assert } from 'assert';
import { reverse, zip, pi, odds, elements, ngram, set, template, cipher, typoglycemia } from '../src/0-9';

describe('0-9', () => {
    it('0', () => {
        assert.equal(reverse('stressed'), 'desserts');
    });
    it('1', () => {
        assert.equal(odds('パタトクカシーー'), 'パトカー');
    })
    it('2', () => {
        assert.equal(zip('パトカー', 'タクシー'), 'パタトクカシーー');
    });
    it('3', () => {
        assert.deepEqual(
            pi('Now I need a drink, alcoholic of course, after the heavy lectures involving quantum mechanics.'),
            [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9]
        );
    });
    it('4', () => {
        assert.deepEqual(
            elements('Hi He Lied Because Boron Could Not Oxidize Fluorine. New Nations Might Also Sign Peace Security Clause. Arthur King Can.'),
            new Map<string, number>([
                ['H', 1],
                ['He', 2],
                ['Li', 3],
                ['Be', 4],
                ['B', 5],
                ['C', 6],
                ['N', 7],
                ['O', 8],
                ['F', 9],
                ['Ne', 10],
                ['Na', 11],
                ['Mi', 12], // MiGht
                ['Al', 13],
                ['Si', 14],
                ['P', 15],
                ['S', 16],
                ['Cl', 17],
                ['Ar', 18],
                ['K', 19],
                ['Ca', 20],
            ])
        );
    });
    describe('5', () => {
        const text = 'I am an NLPer';
        it('word bi-gram', () => {
            assert.deepEqual([...ngram(text, 2, ' ')], [
                'I am',
                'am an',
                'an NLPer',
            ]);
        });
        it('character bi-gram', () => {
            assert.deepEqual([...ngram(text, 2)], [
                'I ',
                ' a',
                'am',
                'm ',
                ' a',
                'an',
                'n ',
                ' N',
                'NL',
                'LP',
                'Pe',
                'er',
            ]);
        });
    });
    describe('6', () => {
        const x = new Set<string>(ngram('paraparaparadise', 2));
        const y = new Set<string>(ngram('paragraph', 2));
        it('union', () => {
            assert.deepEqual(set.union(x, y), new Set([
                'pa',
                'ar',
                'ra',
                'ap',
                'ad',
                'di',
                'is',
                'se',
                'ag',
                'gr',
                'ph',
            ]));
        });
        it('intersect', () => {
            assert.deepEqual(set.intersect(x, y), new Set([
                'pa',
                'ar',
                'ra',
                'ap',
            ]));
        });
        it('diff', () => {
            assert.deepEqual(set.diff(x, y), new Set([
                'ad',
                'di',
                'is',
                'se',
            ]));
        });
        it('has', () => {
            assert(x.has('se'));
            assert(!y.has('se'));
        });
    });
    it('7', () => {
        assert.equal(template(12, '気温', 22.4), '12時の気温は22.4');
    });
    describe('8', () => {
        const text = 'That\'s one small step for man, one giant leap for mankind.';
        it('encrypt decrypt', () => {
            console.log(cipher(text));
            assert.equal(cipher(cipher(text)), text);
        });
    });
    describe('9', () => {
        it('pass short words', () => {
            assert.equal(typoglycemia('test'), 'test');
        });;
        it('sort randomly', () => {
            assert([
                'x123y',
                'x132y',
                'x213y',
                'x231y',
                'x312y',
                'x321y',
            ].includes(typoglycemia('x123y')));
            console.log(typoglycemia('I couldn\'t believe that I could actually understand what I was reading : the phenomenal power of the human mind .'));
        });
    });
});
