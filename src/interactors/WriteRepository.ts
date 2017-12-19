
import { IValidator, WriteOperation } from '../Validator';
import { DataValidationError } from '../errors';
import { IWriteRepository, RepAccessOptions, RepUpdateData, RepUpdateOptions } from './Repository';

export abstract class WriteRepository<ID, T> implements IWriteRepository<ID, T>{
    constructor(protected validator: IValidator) {
        if (!validator) {
            throw new DataValidationError(`'validator' is required`);
        }
    }

    delete(id: ID): Promise<boolean> {
        return this.validator.validate(id, WriteOperation.DELETE)
            .then(validData => this.innerDelete(validData));
    }
    create(data: T, options?: RepAccessOptions<T>): Promise<T> {
        return this.validator.validate(data, WriteOperation.CREATE)
            .then(validData => this.innerCreate(validData, options));
    }
    update(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T> {
        return this.validator.validate(data, WriteOperation.UPDATE)
            .then(validData => this.innerUpdate(validData, options));
    }

    protected abstract innerDelete(id: ID): Promise<boolean>
    protected abstract innerCreate(data: T, options?: RepAccessOptions<T>): Promise<T>
    protected abstract innerUpdate(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T>
}
