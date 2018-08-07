import { BaseEntity, BaseEntityId } from "./entities";


export interface RepositoryAccessOptions<T extends BaseEntity> {
    fields?: (keyof T)[]
}

export interface RepositoryUpdateData<T extends BaseEntity> {
    id: BaseEntityId
    set?: Partial<T>
    delete?: (keyof T)[]
}

export interface ReadRepository<T extends BaseEntity> {
    getById(id: BaseEntityId, options?: RepositoryAccessOptions<T>): Promise<T | null>
    getByIds(ids: BaseEntityId[], options?: RepositoryAccessOptions<T>): Promise<T[]>
    exists(id: BaseEntityId): Promise<boolean>
}

export interface WriteRepository<T extends BaseEntity> {
    delete(id: BaseEntityId): Promise<boolean>
    create(data: T): Promise<T>
    update(data: RepositoryUpdateData<T>): Promise<T>
}

export interface Repository<T extends BaseEntity> extends ReadRepository<T>, WriteRepository<T> {

}
