
import { ValidationOptions, Schema } from 'joi';
import { DataValidationError } from './errors';

export enum WriteOperation {
    DELETE = 'DELETE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export type ValidationDataItem = {
    operation: WriteOperation
    /** Joi schema */
    schema: any
}

export interface IValidator {
    validate<T>(data: T, operation: WriteOperation, options?: any): T
}

export class Validator implements IValidator {
    private items: ValidationDataItem[]

    constructor(items: ValidationDataItem[]) {
        this.items = items || [];
    }

    validate<T>(data: T, operation: WriteOperation, options?: any): T {
        return this.items.filter(item => item.operation === operation)
            .reduce<T>((result, current) => Validator.validate(current.schema, result, options), data);
    }

    static validate<DT>(data: DT, schema: any, options?: any): DT {
        return validate<DT>(data, schema, options);
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
