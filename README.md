# Envious

> Environment variable parsing using Dotenv & Typebox

## Install

```shell
npm i @pitininja/envious
```

## Usage

Environment variables are automatically loaded using [Dotenv](https://github.com/motdotla/dotenv).

Refer to the [official Typebox documentation](https://github.com/sinclairzx81/typebox) for how to write a Typebox schema.

```typescript
import { envious } from '@pitininja/envious';
import { Type } from '@sinclair/typebox';

const env = envious(
    Type.Object({
        STRING_VAR: Type.String(),
        NUMBER_VAR: Type.Integer(),
        BOOLEAN_VAR_WITH_DEFAULT: Type.Boolean({ default: false }),
        OPTIONAL_VAR: Type.Optional(Type.String())
    })
);
```

## Formats

String formats can be loaded in the `formats` property of the options parameter, as an object with the format name as key and a regex or a validation function as value.

```typescript
import { envious } from '@pitininja/envious';
import { Type } from '@sinclair/typebox';
import dayjs from 'dayjs';

const env = envious(
    Type.Object({
        EXAMPLE_URI: Type.String({ format: 'uri' }),
        EXAMPLE_DATE: Type.String({ format: 'date' })
    }),
    {
        formats: {
            uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
            date: (val) => dayjs(val).isValid()
        }
    }
);
```

## Errors

If something goes wrong, Envious will throw an error of class `EnviousError`.

An `EnviousError` error contains a message and a list of `ValueError` (an error class taken from Typebox).

Here is a simple example of how to handle Envious errors :

```typescript
import { envious, EnviousError } from '@pitininja/envious';
import { Type } from '@sinclair/typebox';

try {
    const env = envious(
        Type.Object({
            STRING_VAR: Type.String()
        })
    );
} catch (err: unknown) {
    if (err instanceof EnviousError) {
        console.log('Message:', err.message); // Error message
        console.log('Errors:', err.errors); // Typebox's ValueError array
    }
}
```
