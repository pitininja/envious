# Envious

> Environment variable parsing using Dotenv & Typebox

## Compatibility

Since v3 this library is compatible with both ESM and CJS.

## Install

```shell
npm i @pitininja/envious
```

## Usage

* Environment variables are automatically loaded using [Dotenv](https://github.com/motdotla/dotenv)
* Refer to the [official Typebox documentation](https://github.com/sinclairzx81/typebox) for how to write a Typebox schema

```typescript
import { Type } from '@sinclair/typebox';
import { envious } from '@pitininja/envious';

export const schema = Type.Object({
    STRING_VAR: Type.String(),
    NUMBER_VAR: Type.Integer(),
    BOOLEAN_VAR: Type.Boolean(),
    OPTIONAL_VAR: Type.Optional(Type.String())
});

/**
Parse your environment variables.
If the environment variables don't match the schema, an error will be thrown.
*/
const env = envious(schema);

/**
You can provide default values as second parameter of the envious function.
*/
const envWithDefaults = envious(schema, {
    STRING_VAR: 'Example',
    NUMBER_VAR: 123,
    BOOLEAN_VAR: true,
    OPTIONAL_VAR: 'Example'
});
```
