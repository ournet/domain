
import test from 'ava';
import { convertMongoError } from './convert';
import { DataConflictError } from './errors';

test('convertMongoError', t => {
    t.throws(() => convertMongoError(null), /is required/, 'invalid null error type');
    t.throws(() => convertMongoError(undefined), /is required/, 'invalid undefined error type');
    const error = new Error;
    t.is(convertMongoError(error), error, 'Not converted');
    const newError = convertMongoError({ code: 11000 });
    t.is(newError instanceof DataConflictError, true, 'Converted');
});
