import { BaseEntity, BaseEntityId } from "./entities";
import {
  Repository,
  RepositoryUpdateData,
  RepositoryAccessOptions
} from "./repository";
import { EntityValidator } from "./entity-validator";

export abstract class BaseRepository<T extends BaseEntity>
  implements Repository<T>
{
  constructor(protected validator: EntityValidator<T>) {}

  create(data: T) {
    data = this.beforeCreate(data);
    return this.innerCreate(data);
  }

  put(data: T) {
    data = this.beforePut(data);
    return this.innerPut(data);
  }

  update(data: RepositoryUpdateData<T>) {
    data = this.beforeUpdate(data);
    return this.innerUpdate(data);
  }

  protected beforeCreate(data: T) {
    return this.validator.onCreate(data);
  }

  protected beforeUpdate(data: RepositoryUpdateData<T>) {
    return this.validator.onUpdate(data);
  }

  protected beforePut(data: T) {
    return this.validator.onCreate(data);
  }

  abstract innerCreate(data: T): Promise<T>;

  abstract innerUpdate(data: RepositoryUpdateData<T>): Promise<T>;

  innerPut(_data: T): Promise<T> {
    throw new Error(`Not implemented!`);
  }

  abstract delete(id: BaseEntityId): Promise<boolean>;

  abstract getById(
    id: BaseEntityId,
    options?: RepositoryAccessOptions<T>
  ): Promise<T | null>;

  abstract getByIds(
    ids: BaseEntityId[],
    options?: RepositoryAccessOptions<T>
  ): Promise<T[]>;

  abstract exists(id: BaseEntityId): Promise<boolean>;

  abstract deleteStorage(): Promise<void>;
  abstract createStorage(): Promise<void>;
}
