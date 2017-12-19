
import { UseCase } from './UseCase';
import { IRepository, RepUpdateOptions, RepUpdateData } from './Repository';
import { IValidator, WriteOperation } from '../Validator';

export class UpdateUseCase<ID, ENTITY> extends UseCase<RepUpdateData<ENTITY>, ENTITY, RepUpdateOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>, protected validator?: IValidator) {
        super();
    }

    protected innerExecute(data: RepUpdateData<ENTITY>, options?: RepUpdateOptions<ENTITY>) {
        return this.repository.update(data, options);
    }

    protected validateData(data: RepUpdateData<ENTITY>) {
        if (this.validator) {
            return this.validator.validate(data, WriteOperation.UPDATE)
                .then(validData => super.validateData(validData));
        }
        return super.validateData(data);
    }

}

