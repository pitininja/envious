import 'dotenv/config';
import Os from 'node:os';
import type { Static, TObject } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const envious = <T extends TObject>(schema: T): Static<T> => {
    const parsed = Value.Parse(schema, process.env);
    const errors = [...Value.Errors(schema, parsed)];
    if (errors.length) {
        const computedErrorMessages: Record<string, string[]> = {};
        for (const { path, message } of errors) {
            const envVarName = path.replace(/^\//, '');
            if (!computedErrorMessages[envVarName]) {
                computedErrorMessages[envVarName] = [];
            }
            computedErrorMessages[envVarName].push(message);
        }
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
