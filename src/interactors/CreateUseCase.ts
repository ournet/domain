
import { UseCase } from './UseCase';
import { IRepository, RepAccessOptions } from './repository';
import { IValidator } from '../Validator';

export class CreateUseCase<ID, ENTITY> extends UseCase<ENTITY, ENTITY, RepAccessOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>, protected validator: IValidator<ENTITY>) {
        super();
    }

    protected innerExecute(data: ENTITY, options?: RepAccessOptions<ENTITY>): Promise<ENTITY> {
        return this.repository.create(data, options);
    }

    protected validateData(data: ENTITY): Promise<ENTITY> {
        try {
            this.validator.create(data)
        } catch (e) {
            return Promise.reject(e);
        }
    }

}

