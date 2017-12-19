
import { UseCase } from './UseCase';
import { IRepository, RepAccessOptions } from './Repository';
import { IValidator, WriteOperation } from '../Validator';


export class CreateUseCase<ID, ENTITY> extends UseCase<ENTITY, ENTITY, RepAccessOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>, protected validator?: IValidator) {
        super();
    }

    protected innerExecute(data: ENTITY, options?: RepAccessOptions<ENTITY>): Promise<ENTITY> {
        return this.repository.create(data, options);
    }

    protected validateData(data: ENTITY) {
        if (this.validator) {
            return this.validator.validate(data, WriteOperation.CREATE)
                .then(validData => super.validateData(validData));
        }
        return super.validateData(data);
    }

}

