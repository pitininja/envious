import 'dotenv/config';
import Os from 'os';
import { Value } from '@sinclair/typebox/value';
export const envious = (schema) => {
    const parsed = Value.Convert(schema, process.env);
    const errors = [...Value.Errors(schema, parsed)];
    if (errors.length) {
        const computedErrorMessages = {};
        errors.forEach(({ path, message }) => {
            const envVarName = path.replace(/^\//, '');
            if (!computedErrorMessages[envVarName]) {
                computedErrorMessages[envVarName] = [];
            }
            computedErrorMessages[envVarName].push(message);
        });
        const errorTextParts = [
            'Invalid environment variables',
            ...Object.entries(computedErrorMessages).map(([varName, messages]) => `  ${varName} : ${messages.join(', ')}`)
        ];
        throw new Error(errorTextParts.join(Os.EOL));
    }
    return Value.Cast({
        ...schema,
        additionalProperties: false
    }, parsed);
};
//# sourceMappingURL=index.js.map