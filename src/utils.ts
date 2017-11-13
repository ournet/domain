
export interface IDictionary<V> {
    [key: string]: V
}

export interface IAnyDictionary extends IDictionary<any> { }
export interface IStringDictionary extends IDictionary<string> { }
