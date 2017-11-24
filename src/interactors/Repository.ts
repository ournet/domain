
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

export interface IReadRepository<ID, T> {
    getById(id: ID, options?: RepAccessOptions<T>): Promise<T>
    getByIds(ids: ID[], options?: RepAccessOptions<T>): Promise<T[]>
    exists(id: ID): Promise<boolean>
    // one(data: RepGetData, options?: RepAccessOptions): Promise<T>
    // list(data: RepListData, options?: RepAccessOptions): Promise<T[]>
    // count(data?: RepGetData): Promise<number>
}

export interface IWriteRepository<ID, T> {
    delete(id: ID): Promise<boolean>
    create(data: T, options?: RepAccessOptions<T>): Promise<T>
    update(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T>
}

export interface IRepository<ID, T> extends IReadRepository<ID, T>, IWriteRepository<ID, T> {
    
}

