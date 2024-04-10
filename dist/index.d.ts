import 'dotenv/config';
import { type TObject, type Static } from '@sinclair/typebox';
export declare const envious: <T extends TObject<import("@sinclair/typebox").TProperties>>(schema: T, defaultValues?: Static<T>) => Static<T>;
