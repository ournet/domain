
import test from 'ava';
import { uniq, uniqByProperty, mapPromise, isAbbr, cleanText, countWords } from './helpers';


test('uniq', t => {
    t.deepEqual(uniq([1, 1, 2, 3, 4, 2]), [1, 2, 3, 4]);
});

test('uniqByProperty', t => {
    t.deepEqual(uniqByProperty([{ id: 1 }, { id: 1 }, { id: 2 }], 'id'), [{ id: 1 }, { id: 2 }]);
});

test('mapPromise', async t => {
    const list = [1, 2, 3];
    const result = await mapPromise(list, async item => item * 2);

    t.deepEqual(result, new Map<number, number>([[1, 2], [2, 4], [3, 6]]));
});

test('#isAbbr', t => {
    t.is(isAbbr('ABBR'), true, 'ABBR is an abbreviation')
    t.is(isAbbr('aBBR'), false, 'aBBR is not an abbreviation')
    t.is(isAbbr('A Abbr'), false, 'A Abbr is not an abbreviation')
    t.is(isAbbr('A ABBR'), true, 'A ABBR is an abbreviation')
    t.is(isAbbr('189 & 9'), false, '189 & 9 not abbreviation')
})

test('#cleanText', t => {
    t.is(cleanText('Async (node)'), 'Async node')
    t.is(cleanText('iPhone #5'), 'iPhone 5')
    t.is(cleanText('iPhone & -= &&'), 'iPhone')
    t.is(cleanText('iPhone $^@^%*#^*(#()*#_*_)(@_)(@ &+-iPad'), 'iPhone iPad')
    t.is(cleanText(`This is a super, super text:)
    * No?`), 'This is a super super text No')
})

test('#countWords', t => {
    t.is(countWords('Async (node)'), 2)
    t.is(countWords('iPhone alfa'), 2)
    t.is(countWords('Ștefan'), 1)
    t.is(countWords('iPhone 2'), 2)
    t.is(countWords(''), 0)
})
