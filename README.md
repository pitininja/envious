# Envious

> Environment variable parsing using Dotenv & Typebox

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
    BOOLEAN_VAR_WITH_DEFAULT: Type.Boolean({ default: false }),
    OPTIONAL_VAR: Type.Optional(Type.String())
});

/**
Parse your environment variables.
If the environment variables don't match the schema, an error will be thrown.
*/
const env = envious(schema);
```
