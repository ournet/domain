
import test from 'ava';
import { WriteRepository } from './WriteRepository';
// import { RepAccessOptions, RepUpdateOptions, RepUpdateData } from './Repository';

test('init WriteRepository', t => {
    t.throws(function () {
        new AWriteRepository(null);
    });
});

class AWriteRepository extends WriteRepository<string, string> {

    protected innerDelete(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    protected innerCreate(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    protected innerUpdate(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
