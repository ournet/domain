
import test from 'ava';
import { uniq, uniqByProperty, mapPromise } from './utils';


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
