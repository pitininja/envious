import type { EnviousFormats } from '../src';
import type { TestEnv } from './schema';

export const testFormats: EnviousFormats = {
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
};

type TestData = {
    env: Record<string, string>;
    formats?: EnviousFormats;
} & (
    | {
          isValid: true;
          expected: TestEnv;
          errorCount?: never;
      }
    | {
          isValid: false;
          expected?: never;
          errorCount: number;
      }
);

export const testData: TestData[] = [
    // valid
    {
        env: {
            STRING: 'test',
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: true,
        expected: {
            STRING: 'test',
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'a',
            INTEGER: 123,
            BOOLEAN: true,
            DEFAULT_STRING: 'test',
            DEFAULT_NUMBER: 123,
            DEFAULT_BOOLEAN: true
        }
    },
    // valid (with overwritten default values)
    {
        env: {
            STRING: 'test',
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true',
            DEFAULT_STRING: 'overwritten',
            DEFAULT_NUMBER: '456',
            DEFAULT_BOOLEAN: 'false'
        },
        isValid: true,
        expected: {
            STRING: 'test',
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'a',
            INTEGER: 123,
            BOOLEAN: true,
            DEFAULT_STRING: 'overwritten',
            DEFAULT_NUMBER: 456,
            DEFAULT_BOOLEAN: false
        }
    },
    // missing variable
    {
        env: {
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: false,
        errorCount: 1
    },
    // invalid value
    {
        env: {
            STRING: 'test',
            STRING_FORMAT: 'test@email.com',
            LITERALS: 'invalid',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: false,
        errorCount: 1
    },
    // invalid string format
    {
        env: {
            STRING: 'test',
            STRING_FORMAT: 'invalid',
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: false,
        errorCount: 1
    },
    // multiple errors
    {
        env: {
            STRING_FORMAT: 'invalid',
            LITERALS: 'a',
            INTEGER: 'invalid',
            BOOLEAN: 'true'
        },
        isValid: false,
        errorCount: 3
    }
];
