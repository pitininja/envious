import { type Static, Type } from '@sinclair/typebox';

export const testSchema = Type.Object({
    STRING: Type.String(),
    LITERALS: Type.Union([Type.Literal('a'), Type.Literal('b')]),
    INTEGER: Type.Integer(),
    BOOLEAN: Type.Boolean(),
    OPTIONAL_STRING: Type.Optional(Type.String()),
    OPTIONAL_INTEGER: Type.Optional(Type.Integer())
});

export type TestEnv = Static<typeof testSchema>;
