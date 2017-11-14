
import { ValidationOptions, ObjectSchema } from 'joi';
import { DataValidationError } from './errors';
import { RepUpdateData } from './interactors/Repository';

export interface IValidator<T> {
    create(data: T, options?: any): T
    update(data: RepUpdateData<T>, options?: any): RepUpdateData<T>
}

export class Validator<T> implements IValidator<T> {
    private createSchema: ObjectSchema
    private updateSchema?: ObjectSchema

    constructor(createSchema: any, updateSchema?: any) {
        this.createSchema = <ObjectSchema>createSchema;
        if (updateSchema) {
            this.updateSchema = <ObjectSchema>updateSchema;
        }
    }

    create(data: T, options?: any): T {
        return validate(this.createSchema, data, options);
    }

    update(data: RepUpdateData<T>, options?: any): RepUpdateData<T> {
        if (this.updateSchema) {
            data.item = validate(this.updateSchema, data.item, options);
        }
        return data;
    }
}

function validate<T>(schema: ObjectSchema, data: T, options?: ValidationOptions): T {
    options = options || { abortEarly: true, convert: true, allowUnknown: false, stripUnknown: false };

    const result = schema.validate(data, options);
    if (result.error) {
        throw new DataValidationError(result.error.message);
    }

    return result.value;
}