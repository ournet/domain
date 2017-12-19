
import { ValidationOptions, Schema } from 'joi';
import { DataValidationError } from './errors';

export enum WriteOperation {
    DELETE = 'DELETE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export type ValidationItem = {
    operation: WriteOperation
    validate: <T>(data: T) => Promise<T>
}

export interface IValidator {
    validate<T>(data: T, operation: WriteOperation): Promise<T>
}

export class Validator implements IValidator {
    private items: ValidationItem[]

    constructor(items: ValidationItem[]) {
        this.items = items || [];
    }

    validate<T>(data: T, operation: WriteOperation): Promise<T> {
        const items = this.items.filter(item => item.operation === operation);
        if (items.length === 0) {
            return Promise.resolve(data);
        }
        return items.reduce<Promise<T>>((prev, current) =>
            prev.then(result => current.validate<T>(result)), Promise.resolve(data));
    }
}

export function createSchemaValidationItem(schema: any, operation: WriteOperation, options?: any): ValidationItem {
    return {
        operation: operation,
        validate: function <T>(data: T): Promise<T> {
            return new Promise((resolve, reject) => {
                try {
                    resolve(validate<T>(data, schema, options));
                } catch (e) {
                    return reject(e);
                }
            });
        }
    }
}

function validate<T>(data: T, schema: Schema, options?: ValidationOptions): T {
    if (!schema) {
        throw new DataValidationError(`'schema' is required`);
    }
    if (typeof schema.validate !== 'function') {
        throw new DataValidationError(`'schema' is invalid`);
    }
    if (!data) {
        throw new DataValidationError(`'data' is required`);
    }

    options = Object.assign({
        abortEarly: true,
        convert: true,
        allowUnknown: true,
        stripUnknown: false
    },
        options || {});

    const result = schema.validate(data, options);
    if (result.error) {
        throw new DataValidationError(result.error.message);
    }

    return result.value;
}
