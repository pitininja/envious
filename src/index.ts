import { FormatRegistry, type Static, type TObject } from '@sinclair/typebox';
import { AssertError, Value, type ValueError } from '@sinclair/typebox/value';

export type EnviousFormats = {
    [name: string]: RegExp | ((val: unknown) => boolean);
};

export type EnviousOptions = {
    formats?: EnviousFormats;
    logErrors?: boolean;
    logger?: (message: string) => void;
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

const logValidationErrors = (
    errors: ValueError[],
    logger?: (message: string) => void
) => {
    const log = logger ?? console.error;
    log('Envious validation failed :');
    const validationErrorsMap = new Map<string, string[]>();
    for (const { path, message } of errors) {
        const envVarName = path.replace(/^\//, '');
        const errorMessages = validationErrorsMap.get(envVarName);
        validationErrorsMap.set(envVarName, [
            ...(errorMessages ?? []),
            message
        ]);
    }
    for (const [name, messages] of validationErrorsMap.entries()) {
        log(`  - ${name} : ${messages.join(', ')}`);
    }
};

export const envious = <T extends TObject>(
    schema: T,
    { formats, logErrors, logger }: EnviousOptions = {}
): Static<T> => {
    const invalidEnvVarMessage = 'Invalid environment variables';
    try {
        if (formats) {
            setFormats(formats);
        }
        const env = Value.Clone(process.env);
        const cleaned = Value.Clean(schema, env);
        const defaulted = Value.Default(schema, cleaned);
        const converted = Value.Convert(schema, defaulted);
        const errors = [...Value.Errors(schema, converted)];
        if (errors.length) {
            if (logErrors) {
                logValidationErrors(errors, logger);
            }
            throw new EnviousError(invalidEnvVarMessage, errors);
        }
        return Value.Cast(
            {
                ...schema,
                additionalProperties: false
            },
            converted
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
