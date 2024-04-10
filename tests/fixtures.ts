import { type TestEnv } from './schema';

type TestData = {
    env: Record<string, string>;
    defaultValues?: Partial<TestEnv>;
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
            BOOLEAN: true
        }
    },
    // with defaults
    {
        env: {
            STRING: 'notdefault',
            LITERALS: 'b',
            INTEGER: '456',
            BOOLEAN: 'false'
        },
        defaultValues: {
            STRING: 'default',
            LITERALS: 'a',
            INTEGER: 123,
            BOOLEAN: true,
            OPTIONAL_STRING: 'string',
            OPTIONAL_INTEGER: 789
        },
        isValid: true,
        expected: {
            STRING: 'notdefault',
            LITERALS: 'b',
            INTEGER: 456,
            BOOLEAN: false,
            OPTIONAL_STRING: 'string',
            OPTIONAL_INTEGER: 789
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
