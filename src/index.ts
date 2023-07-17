import 'dotenv/config';
import { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import Os from 'os';

export const envious = <T extends TSchema>(schema: T): Static<T> => {
    const parsed = Value.Convert(schema, process.env);
    const errors = [...Value.Errors(schema, parsed)];
    if (errors.length) {
        const computedErrorMessages: Record<string, string[]> = {};
        errors.forEach(({ path, message }) => {
            const envVarName = path.replace(/^\//, '');
            if (!computedErrorMessages[envVarName]) {
                computedErrorMessages[envVarName] = [];
            }
            computedErrorMessages[envVarName].push(message);
        });
        const errorTextParts: string[] = [
            'Invalid environment variables',
            ...Object.entries(computedErrorMessages).map(
                ([varName, messages]) => `  ${varName} : ${messages.join(', ')}`
            )
        ];
        throw new Error(errorTextParts.join(Os.EOL));
    }
    return Value.Cast(
        {
            ...schema,
            additionalProperties: false
        },
        parsed
    );
};
