"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envious = exports.EnviousError = void 0;
require("dotenv/config");
const typebox_1 = require("@sinclair/typebox");
const value_1 = require("@sinclair/typebox/value");
class EnviousError extends Error {
    errors;
    constructor(message, errors) {
        super(message);
        this.errors = errors ?? [];
    }
}
exports.EnviousError = EnviousError;
const setFormats = (formats) => {
    for (const name of Object.keys(formats)) {
        const format = formats[name];
        typebox_1.FormatRegistry.Set(name, format instanceof RegExp ? (val) => format.test(val) : format);
    }
};
const envious = (schema, options) => {
    const invalidEnvVarMessage = 'Invalid environment variables';
    try {
        if (options?.formats) {
            setFormats(options.formats);
        }
        const parsed = value_1.Value.Parse(schema, process.env);
        const errors = [...value_1.Value.Errors(schema, parsed)];
        if (errors.length) {
            throw new EnviousError(invalidEnvVarMessage, errors);
        }
        return value_1.Value.Cast({
            ...schema,
            additionalProperties: false
        }, parsed);
    }
    catch (err) {
        if (err instanceof EnviousError) {
            throw err;
        }
        if (err instanceof value_1.AssertError) {
            throw new EnviousError(invalidEnvVarMessage, err.error ? [err.error] : []);
        }
        throw new EnviousError(`Unexpected error while parsing environment variables${err instanceof Error ? ` (${err.message})` : ''}`);
    }
};
exports.envious = envious;
//# sourceMappingURL=index.js.map