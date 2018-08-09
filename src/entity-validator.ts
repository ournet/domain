import { BaseEntity } from "./entities";
import { RepositoryUpdateData } from "./repository";

export interface EntityValidator<T extends BaseEntity> {
    onCreate(data: T): Promise<T>
    onUpdate(data: RepositoryUpdateData<T>): Promise<RepositoryUpdateData<T>>
}
