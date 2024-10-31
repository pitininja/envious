import { type Static, Type } from '@sinclair/typebox';

export const testSchema = Type.Object({
    STRING: Type.String(),
    STRING_FORMAT: Type.String({ format: 'email' }),
    LITERALS: Type.Union([Type.Literal('a'), Type.Literal('b')]),
    INTEGER: Type.Integer(),
    BOOLEAN: Type.Boolean(),
    OPTIONAL_STRING: Type.Optional(Type.String()),
    OPTIONAL_INTEGER: Type.Optional(Type.Integer()),
    DEFAULT_STRING: Type.String({ default: 'test' }),
    DEFAULT_NUMBER: Type.Integer({ default: 123 }),
    DEFAULT_BOOLEAN: Type.Boolean({ default: true })
});

export type TestEnv = Static<typeof testSchema>;
