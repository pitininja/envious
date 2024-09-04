"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envious = void 0;
require("dotenv/config");
const node_os_1 = __importDefault(require("node:os"));
const value_1 = require("@sinclair/typebox/value");
const envious = (schema) => {
    const parsed = value_1.Value.Parse(schema, process.env);
    const errors = [...value_1.Value.Errors(schema, parsed)];
    if (errors.length) {
        const computedErrorMessages = {};
        for (const { path, message } of errors) {
            const envVarName = path.replace(/^\//, '');
            if (!computedErrorMessages[envVarName]) {
                computedErrorMessages[envVarName] = [];
            }
            computedErrorMessages[envVarName].push(message);
        }
        const errorTextParts = [
            'Invalid environment variables',
            ...Object.entries(computedErrorMessages).map(([varName, messages]) => `  ${varName} : ${messages.join(', ')}`)
        ];
        throw new Error(errorTextParts.join(node_os_1.default.EOL));
    }
    return value_1.Value.Cast({
        ...schema,
        additionalProperties: false
    }, parsed);
};
exports.envious = envious;
//# sourceMappingURL=index.js.map