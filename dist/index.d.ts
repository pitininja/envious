import 'dotenv/config';
import { type TObject, type Static } from '@sinclair/typebox';
export declare const envious: <T extends TObject>(schema: T, defaultValues?: Partial<Static<T>>) => Static<T>;
