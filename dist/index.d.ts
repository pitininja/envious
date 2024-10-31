import 'dotenv/config';
import { type Static, type TObject } from '@sinclair/typebox';
import { type ValueError } from '@sinclair/typebox/value';
export type EnviousFormats = {
    [name: string]: RegExp | ((val: unknown) => boolean);
};
export type EnviousOptions = {
    formats: EnviousFormats;
};
export declare class EnviousError extends Error {
    errors: ValueError[];
    constructor(message: string, errors?: ValueError[]);
}
export declare const envious: <T extends TObject>(schema: T, options?: EnviousOptions) => Static<T>;
