
import { ValidationOptions, ObjectSchema } from 'joi';
import { DataValidationError } from './errors';
import { RepUpdateData } from './interactors/Repository';

export interface IValidator<T> {
    create(data: T, options?: any): T
    update(data: RepUpdateData<T>, options?: any): RepUpdateData<T>
}

export interface ValidatorDataItem {
    schema?: any
    // fields?: string[]
}

export class Validator<T> implements IValidator<T> {

    constructor(private createData?: ValidatorDataItem, private updateData?: ValidatorDataItem) { }

    create(data: T, options?: any): T {
        return this.validate(this.createData, data, options);
    }

    update(data: RepUpdateData<T>, options?: any): RepUpdateData<T> {
        if (!data) {
            throw new DataValidationError(`'data' is required`);
        }
        // if (!data.item) {
        //     throw new DataValidationError(`'data.item' is required`);
        // }

        data = this.validate(this.updateData, data, options);

        return data;
    }

    private validate<DT>(itemData: ValidatorDataItem, data: DT, options?: ValidationOptions): DT {
        if (!data) {
            throw new DataValidationError(`'data' is required`);
        }

        if (itemData) {
            // if (itemData.fields && itemData.fields.length) {
            //     Object.keys(data).forEach(key => itemData.fields.indexOf(key) < 0 && delete data[key]);
            // }
            if (itemData.schema) {
                return validate(itemData.schema, data, options);
            }
        }
        return data;
    }
}

function validate<T>(schema: ObjectSchema, data: T, options?: ValidationOptions): T {
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
