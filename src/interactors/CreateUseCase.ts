
import { UseCase } from './UseCase';
import { IRepository, RepAccessOptions } from './repository';

export class CreateUseCase<ID, ENTITY> extends UseCase<ENTITY, ENTITY, RepAccessOptions<ENTITY>>{

    constructor(protected repository: IRepository<ID, ENTITY>) {
        super();
    }

    protected innerExecute(data: ENTITY, options?: RepAccessOptions<ENTITY>): Promise<ENTITY> {
        return this.repository.create(data, options);
    }

}

