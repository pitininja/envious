import 'dotenv/config';
import type { Static, TObject } from '@sinclair/typebox';
export declare const envious: <T extends TObject>(schema: T) => Static<T>;
