
// import { IDictionary } from '../utils';
// import { DataKeys } from './data-keys';

export interface RepAccessOptions<T> {
    /**
     * Fields to return separated by spaces
     */
    fields?: (keyof T)[]
}

export interface RepUpdateOptions<T> extends RepAccessOptions<T> {

}

export interface RepUpdateData<T> {
    // id: ID
    item: T
    delete?: (keyof T)[]
    // inc?: { [index: string]: number }
}

// export type RepListData = {
//     keys: DataKeys
//     count: number
// }

// export interface RepGetData extends DataKeys {

// }

export interface IRepository<ID, T> {
    delete(id: ID): Promise<boolean>
    getById(id: ID, options?: RepAccessOptions<T>): Promise<T>
    exists(id: ID): Promise<boolean>
    // count(data?: RepGetData): Promise<number>
    create(data: T, options?: RepAccessOptions<T>): Promise<T>
    update(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T>
    // one(data: RepGetData, options?: RepAccessOptions): Promise<T>
    // list(data: RepListData, options?: RepAccessOptions): Promise<T[]>
}

