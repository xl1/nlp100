import { join } from 'path';
import { strict as assert } from 'assert';
import { search, extCategoryLines, extCategoryNames, extSections, extFiles, extTemplate, mapValue, removeEmphasis, removeLinks, removeMarkup, getFlagUrl } from '../src/20-29';

describe.only('20-29', () => {
    let text: string;
    let info: Map<string, string>;

    it('20', async () => {
        const db = join(__dirname, '../assets/jawiki-country.json.gz');
        const searchResult = await search(db, 'イギリス');
        if (searchResult) {
            text = searchResult;
        } else {
            assert.fail('search() cannot find the article');
        }
    });

    it('21', () => console.log(extCategoryLines(text)));
    it('22', () => console.log(extCategoryNames(text)));
    it('23', () => console.log(extSections(text)));
    it('24', () => console.log(extFiles(text)));

    it('25', () => {
        info = extTemplate(text);
        console.log(info);
        assert.equal(info.size, 51);
    });
    it('26', () => console.log(info = mapValue(info, removeEmphasis)));
    it('27', () => console.log(info = mapValue(info, removeLinks)));
    it('28', () => console.log(info = mapValue(info, removeMarkup)));

    it('29', async () => {
        assert.equal(
            await getFlagUrl(info),
            'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
        );
    });
});
