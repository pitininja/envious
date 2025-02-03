import { describe, expect, test, vi } from 'vitest';

import { EnviousError, envious } from '../src/index.js';
import { testData, testFormats } from './fixtures.js';
import { testSchema } from './schema.js';

describe('Envious', () => {
    test('Should successfully parse environment variables', () => {
        const validTestData = testData.filter(({ isValid }) => isValid);
        for (const { env, expected } of validTestData) {
            vi.unstubAllEnvs();
            for (const [name, value] of Object.entries(env)) {
                vi.stubEnv(name, value);
            }
            const result = envious(testSchema, { formats: testFormats });
            expect(result).toEqual(expected);
        }
    });

    test('Should fail to parse environment variables', () => {
        const invalidTestData = testData.filter(({ isValid }) => !isValid);
        for (const { env } of invalidTestData) {
            vi.unstubAllEnvs();
            for (const [name, value] of Object.entries(env)) {
                vi.stubEnv(name, value);
            }
            expect(() => envious(testSchema, { formats: testFormats })).toThrow(
                EnviousError
            );
        }
    });

    test('Should log parsing errors', () => {
        const invalidTestData = testData.filter(({ isValid }) => !isValid);
        for (const { env, errorCount } of invalidTestData) {
            vi.unstubAllEnvs();
            for (const [name, value] of Object.entries(env)) {
                vi.stubEnv(name, value);
            }
            const loggedErrors: string[] = [];
            expect(() =>
                envious(testSchema, {
                    formats: testFormats,
                    logErrors: true,
                    logger: (message) => loggedErrors.push(message)
                })
            ).toThrow(EnviousError);
            expect(loggedErrors).toHaveLength((errorCount ?? 0) + 1);
        }
    });
});
