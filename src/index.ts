import 'dotenv/config';
import { type TObject, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import Os from 'os';

export const envious = <T extends TObject>(
    schema: T,
    defaultValues?: Static<T>
): Static<T> => {
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
    const env = Value.Cast(
        {
            ...schema,
            additionalProperties: false
        },
        parsed
    );
    return {
        ...defaultValues,
        ...env
    };
};
