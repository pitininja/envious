import { describe, expect, test, vi } from 'vitest';

import { envious } from '../src/index.js';
import { testData } from './fixtures.js';
import { testSchema } from './schema.js';

describe('Envious', () => {
    test('Should correctly parse environment variables', () => {
        for (const { env, isValid, expected } of testData) {
            vi.unstubAllEnvs();
            for (const [name, value] of Object.entries(env)) {
                vi.stubEnv(name, value);
            }
            if (isValid) {
                const result = envious(testSchema);
                expect(result).toEqual(expected);
            } else {
                expect(() => envious(testSchema)).toThrow();
            }
        }
    });
});
