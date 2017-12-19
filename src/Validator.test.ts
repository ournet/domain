
import { Validator, createSchemaValidationItem, WriteOperation } from './Validator';
import test from 'ava';
import * as Joi from 'joi';

test('constructor', async t => {
    const emptyValidator = new Validator([]);
    const nullValidator = new Validator(null);

    const data = 10;

    t.is(await emptyValidator.validate(data, WriteOperation.CREATE), data, 'Data not modified');
    t.is(await nullValidator.validate(data, WriteOperation.CREATE), data, 'Data not modified');
});

test('schema', async t => {
    const updateSchema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().trim().required()
    }).required();

    const validator = new Validator([createSchemaValidationItem(updateSchema, WriteOperation.UPDATE)]);

    const data = { id: 10, name: '   Name ' };
    const validData = await validator.validate(data, WriteOperation.UPDATE);

    t.is(validData.id, data.id, 'Data id not modified');
    t.is(validData.name, data.name.trim(), 'Data id modified');
});

test('custom', async t => {

    const validator = new Validator([{
        operation: WriteOperation.CREATE,
        validate: <T>(data: T) => {
            return Promise.resolve(data);
        }
    }]);

    const data = 10;
    const validData = await validator.validate(data, WriteOperation.CREATE);

    t.is(validData, data, 'Data id not modified');
});
