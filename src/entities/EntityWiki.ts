
import { IDictionary } from '../utils';

export interface IEntityWiki {
    wikiId?: string
    extract?: string
    description?: string
    props?: IDictionary<string[]>
}
