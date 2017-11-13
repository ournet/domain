
const debug = require('debug')('ournet-domain');
import { DataConflictError, CodeError } from './errors';

export function convertMongoError(error: any): Error {
    if (!error) {
        throw new CodeError({ message: `param 'error' is required` });
    }
    switch (error.code) {
        case 11000:
            debug('convert error to DataConflict Error');
            return new DataConflictError({ error: error });
        default:
            debug('not convert error');
            return error;
    }
}
