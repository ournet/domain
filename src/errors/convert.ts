
const debug = require('debug')('ournet-domain');
import { DataConflictError } from './errors';

export function convertMongoError(error: any): Error {
    if (!error) {
        throw new TypeError(`param 'error' is required`);
    }
    switch (error.code) {
        case 11000:
            debug('convert error to DataConflict Error');
            return new DataConflictError(error.message);
        default:
            debug('not convert error');
            return error;
    }
}
