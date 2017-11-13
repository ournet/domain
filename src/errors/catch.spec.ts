
import test from 'ava';
import { catchError } from './catch';

test('catchError', async t => {
    t.throws(() => catchError(null), /is required/, 'ivalid null error type');
    t.throws(() => catchError(undefined), /is required/, 'ivalid undefined error type');
    t.is(await catchError(Error)(new Error), undefined, 'Catch Error');
});
