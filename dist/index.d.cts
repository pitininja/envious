import * as _sinclair_typebox from '@sinclair/typebox';
import { TObject, Static } from '@sinclair/typebox';

declare const envious: <T extends TObject<_sinclair_typebox.TProperties>>(schema: T, defaultValues?: Static<T>) => Static<T>;

export { envious };
