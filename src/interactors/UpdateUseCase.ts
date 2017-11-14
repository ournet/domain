
import { UseCase } from './UseCase';
import { IRepository, RepUpdateOptions, RepUpdateData } from './repository';
import { IValidator } from '../Validator';

export class UpdateUseCase<ID, ENTITY> extends UseCase<RepUpdateData<ENTITY>, ENTITY, RepUpdateOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>, protected validator: IValidator<ENTITY>) {
        super();
    }

    protected innerExecute(data: RepUpdateData<ENTITY>, options?: RepUpdateOptions<ENTITY>) {
        return this.repository.update(data, options);
    }

    protected validateData(data: RepUpdateData<ENTITY>): Promise<RepUpdateData<ENTITY>> {
        try {
            this.validator.update(data)
        } catch (e) {
            return Promise.reject(e);
        }
    }

}

