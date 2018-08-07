
const normalizeUrlFn = require('normalize-url');

import { createHash } from "crypto";

export function md5(value: string): string {
    return createHash('md5').update(value, 'utf8').digest('hex').toLowerCase();
}

export function sha1(value: string): string {
    return createHash('sha1').update(value, 'utf8').digest('hex').toLowerCase();
}

export function normalizeUrl(url: string): string {
    return normalizeUrlFn(url, {
        normalizeProtocol: true,
        normalizeHttps: true,
        normalizeHttp: false,
        stripFragment: true,
        stripWWW: true,
        removeQueryParameters: [/^utm_\w+/i],
        removeTrailingSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true,
    });
}

export function uniq<T>(items: T[]) {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}

export function uniqByProperty<T>(items: T[], prop: keyof T): T[] {
    const map: { [index: string]: any } = {}
    const list: T[] = []

    for (let item of items) {
        if (map[(<any>item)[prop]] === undefined) {
            map[(<any>item)[prop]] = 1;
            list.push(item)
        }
    }

    return list;
}

export function mapPromise<T, R>(keys: T[], callback: (key: T) => Promise<R>):
    Promise<Map<T, R>> {
    const tasks = keys.map(key => callback(key).then(result => ({ key, result })));

    return Promise.all(tasks)
        .then(results => {
            const response: Map<T, R> = new Map();

            for (let item of results) {
                response.set(item.key, item.result);
            }

            return response;
        });
}
