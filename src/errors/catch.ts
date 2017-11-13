
const debug = require('debug')('ournet-domain');

export function catchError(type: any) {
    if (!type) {
        throw new TypeError(`arg 'type' is required!`);
    }

    const typename = type.name || type.constructor && type.constructor.name;
    return function (error: any): Promise<void> {
        if (error instanceof type) {
            debug('catched error of type: ' + typename);
            return Promise.resolve();
        } else {
            return Promise.reject(error);
        }
    }
}
