export interface IEquals {
    equals(other: IEquals): boolean;
};

export type Primitive = String | Number | undefined | null | Boolean;

export default class Arrays {

    // #region fields
    private static _objectsPredicate = function (object: IEquals, otherObject: IEquals): boolean {
        return object.equals(otherObject);
    };

    private static _primitivesPredicate = function (primitive: Primitive, otherPrimitive: Primitive): boolean {
        return primitive === otherPrimitive;
    };
    // #endregion fields

    // #region methods
    private static compareArrayWithOther(array: any[], otherArray: any[], predicate: Function): boolean {
        return array.every(item => otherArray.some(otherItem => predicate(item, otherItem)));
    };

    public static equals(array: any[], otherArray: any[], predicate: Function): boolean {
        return Boolean(array)
            && Boolean(otherArray)
            && array.length === otherArray.length
            && Arrays.compareArrayWithOther(array, otherArray, predicate)
            && Arrays.compareArrayWithOther(otherArray, array, predicate);
    };

    public static arePrimitivesEqual = function (array: Primitive[], otherArray: Primitive[]): boolean {
        return Arrays.equals(array, otherArray, Arrays._primitivesPredicate);
    };

    public static areObjectsEqual = function (array: IEquals[], otherArray: IEquals[]): boolean {
        return Arrays.equals(array, otherArray, Arrays._objectsPredicate);
    };
    // #endregion methods
};
