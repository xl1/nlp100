import { strict as assert } from 'assert';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { countLines, tabToSpace, selectColumn, merge, head, tail, split, uniq, numSort, freqSort } from '../src/10-19';
import { join } from 'path';

const sh = (command: string) => new Promise<string>((resolve, reject) => {
    exec(command, (err, stdout, strerr) => {
        if (err) reject(err);
        else resolve(stdout);
    });
});

describe('10-19', () => {
    let filePath: string;
    let text: string;
    let tempDir: string;
    before(async () => {
        filePath = join(__dirname, '../assets/hightemp.txt');
        text = await fs.readFile(filePath, { encoding: 'utf8' });
        await fs.mkdir(tempDir = join(__dirname, 'temp'));
    });

    after(async () => {
        await fs.rmdir(tempDir, { recursive: true });
    });

    it('10', async () => {
        assert.equal(`${countLines(text)}\n`, await sh(`wc -l < ${filePath}`));
    });
    it('11', async () => {
        assert.equal(tabToSpace(text), await sh(`sed -e 's/\t/ /g' ${filePath}`));
    });
    describe('12', () => {
        it('select 1st column', async () => {
            assert.equal(selectColumn(text, 0), await sh(`cut -f1 ${filePath}`));
        });
        it('select 2nd column', async () => {
            assert.equal(selectColumn(text, 1), await sh(`cut -f2 ${filePath}`));
        });
    });
    it('13', async () => {
        await sh(`cut -f1 ${filePath} > ${tempDir}/col1.txt`);
        await sh(`cut -f2 ${filePath} > ${tempDir}/col2.txt`);
        assert.equal(
            merge(selectColumn(text, 0), selectColumn(text, 1)),
            await sh(`paste ${tempDir}/col1.txt ${tempDir}/col2.txt`)
        );
    });
    it('14', async () => {
        assert.equal(head(text, 5), await sh(`head -5 ${filePath}`));
    });
    it('15', async () => {
        assert.equal(tail(text, 5), await sh(`tail -5 ${filePath}`));
    });
    it('16', async () => {
        await sh(`split -n l/3 ${filePath} ${tempDir}/`);
        const result = [...split(text, 3)];
        assert.equal(result[0], await fs.readFile(join(tempDir, 'aa'), { encoding: 'utf8' }));
        assert.equal(result[1], await fs.readFile(join(tempDir, 'ab'), { encoding: 'utf8' }));
        assert.equal(result[2], await fs.readFile(join(tempDir, 'ac'), { encoding: 'utf8' }));
    });
    it('17', async () => {
        assert.equal(uniq(text, 0), await sh(`cut -f1 ${filePath} | sort -u`));
    });
    it('18', async () => {
        assert.equal(numSort(text, 2), await sh(`sort -nrs -k 3,3 ${filePath}`));
    });
    it('19', async () => {
        assert.equal(
            freqSort(text, 0),
            await sh(`cut -f1 ${filePath} | sort | uniq -c | sort -nr | sed -e 's/[ 0-9]*//g'`)
        );
    });
});
