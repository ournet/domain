
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
        try {
            id = this.validator.validate(id, WriteOperation.DELETE);
        } catch (e) {
            return Promise.reject(e);
        }
        return this.innerDelete(id);
    }
    create(data: T, options?: RepAccessOptions<T>): Promise<T> {
        try {
            data = this.validator.validate(data, WriteOperation.CREATE);
        } catch (e) {
            return Promise.reject(e);
        }
        return this.innerCreate(data, options);
    }
    update(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T> {
        try {
            data = this.validator.validate(data, WriteOperation.UPDATE);
        } catch (e) {
            return Promise.reject(e);
        }
        return this.innerUpdate(data, options);
    }

    protected abstract innerDelete(id: ID): Promise<boolean>
    protected abstract innerCreate(data: T, options?: RepAccessOptions<T>): Promise<T>
    protected abstract innerUpdate(data: RepUpdateData<T>, options?: RepUpdateOptions<T>): Promise<T>
}
