import { type TestEnv } from './schema';

type TestData = {
    env: Record<string, string>;
} & (
    | {
          isValid: true;
          expected: TestEnv;
      }
    | {
          isValid: false;
          expected?: never;
      }
);

export const testData: TestData[] = [
    // valid
    {
        env: {
            STRING: 'test',
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: true,
        expected: {
            STRING: 'test',
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
            LITERALS: 'a',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: false
    },
    // invalid value
    {
        env: {
            STRING: 'test',
            LITERALS: 'invalid',
            INTEGER: '123',
            BOOLEAN: 'true'
        },
        isValid: false
    }
];
