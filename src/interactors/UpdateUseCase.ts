
import { UseCase } from './UseCase';
import { IRepository, RepUpdateOptions, RepUpdateData } from './repository';

export class UpdateUseCase<ID, ENTITY> extends UseCase<RepUpdateData<ENTITY>, ENTITY, RepUpdateOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>) {
        super();
    }

    protected innerExecute(data: RepUpdateData<ENTITY>, options?: RepUpdateOptions<ENTITY>) {
        return this.repository.update(data, options);
    }

}

