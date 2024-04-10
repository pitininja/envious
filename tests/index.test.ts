import { vi, describe, test, expect } from 'vitest';

import { envious } from '../src/index.js';
import { testSchema } from './schema.js';
import { testData } from './fixtures.js';

describe('Envious', () => {
    test('Should correctly parse environment variables', () => {
        testData.forEach(({ env, defaultValues, isValid, expected }) => {
            vi.unstubAllEnvs();
            Object.entries(env).forEach(([name, value]) => {
                vi.stubEnv(name, value);
            });
            if (isValid) {
                const result = envious(testSchema, defaultValues);
                expect(result).toEqual(expected);
            } else {
                expect(() => envious(testSchema, defaultValues)).toThrow();
            }
        });
    });
});
