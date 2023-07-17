import 'dotenv/config';
import { Static, TSchema } from '@sinclair/typebox';
export declare const envious: <T extends TSchema>(schema: T) => Static<T>;
