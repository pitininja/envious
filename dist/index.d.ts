import 'dotenv/config';
import { type Static, type TSchema } from '@sinclair/typebox';
export declare const envious: <T extends TSchema>(schema: T) => Static<T>;
