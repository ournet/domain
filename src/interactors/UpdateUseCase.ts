
import { UseCase } from './UseCase';
import { IRepository, RepUpdateOptions, RepUpdateData } from './Repository';
import { IValidator } from '../Validator';

export class UpdateUseCase<ID, ENTITY> extends UseCase<RepUpdateData<ENTITY>, ENTITY, RepUpdateOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>, protected validator?: IValidator<ENTITY>) {
        super();
    }

    protected innerExecute(data: RepUpdateData<ENTITY>, options?: RepUpdateOptions<ENTITY>) {
        return this.repository.update(data, options);
    }

    protected validateData(data: RepUpdateData<ENTITY>) {
        if (this.validator) {
            try {
                data = this.validator.update(data)
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return super.validateData(data);
    }

}

