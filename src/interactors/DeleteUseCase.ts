
import { UseCase } from './UseCase';
import { IRepository } from './repository';

export class DeleteUseCase<ID, ENTITY> extends UseCase<ID, boolean, never>{

    constructor(protected repository: IRepository<ID, ENTITY>) {
        super();
    }

    protected innerExecute(id: ID) {
        return this.repository.delete(id);
    }

}

