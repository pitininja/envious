import 'dotenv/config';
import { FormatRegistry, type Static, type TObject } from '@sinclair/typebox';
import { AssertError, Value, type ValueError } from '@sinclair/typebox/value';

export type EnviousFormats = {
    [name: string]: RegExp | ((val: unknown) => boolean);
};

export type EnviousOptions = {
    formats: EnviousFormats;
};

export class EnviousError extends Error {
    errors: ValueError[];
    constructor(message: string, errors?: ValueError[]) {
        super(message);
        this.errors = errors ?? [];
    }
}

const setFormats = (formats: EnviousFormats) => {
    for (const name of Object.keys(formats)) {
        const format = formats[name];
        FormatRegistry.Set(
            name,
            format instanceof RegExp ? (val) => format.test(val) : format
        );
    }
};

export const envious = <T extends TObject>(
    schema: T,
    options?: EnviousOptions
): Static<T> => {
    const invalidEnvVarMessage = 'Invalid environment variables';
    try {
        if (options?.formats) {
            setFormats(options.formats);
        }
        const parsed = Value.Parse(schema, process.env);
        const errors = [...Value.Errors(schema, parsed)];
        if (errors.length) {
            throw new EnviousError(invalidEnvVarMessage, errors);
        }
        return Value.Cast(
            {
                ...schema,
                additionalProperties: false
            },
            parsed
        );
    } catch (err: unknown) {
        if (err instanceof EnviousError) {
            throw err;
        }
        if (err instanceof AssertError) {
            throw new EnviousError(
                invalidEnvVarMessage,
                err.error ? [err.error] : []
            );
        }
        throw new EnviousError(
            `Unexpected error while parsing environment variables${err instanceof Error ? ` (${err.message})` : ''}`
        );
    }
};
