'use strict';

require('dotenv/config');
var value = require('@sinclair/typebox/value');
var Os = require('os');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Os__default = /*#__PURE__*/_interopDefault(Os);

// src/index.ts
var envious = (schema, defaultValues) => {
  const parsed = value.Value.Convert(schema, process.env);
  const errors = [...value.Value.Errors(schema, parsed)];
  if (errors.length) {
    const computedErrorMessages = {};
    errors.forEach(({ path, message }) => {
      const envVarName = path.replace(/^\//, "");
      if (!computedErrorMessages[envVarName]) {
        computedErrorMessages[envVarName] = [];
      }
      computedErrorMessages[envVarName].push(message);
    });
    const errorTextParts = [
      "Invalid environment variables",
      ...Object.entries(computedErrorMessages).map(
        ([varName, messages]) => `  ${varName} : ${messages.join(", ")}`
      )
    ];
    throw new Error(errorTextParts.join(Os__default.default.EOL));
  }
  const env = value.Value.Cast(
    {
      ...schema,
      additionalProperties: false
    },
    parsed
  );
  return {
    ...defaultValues,
    ...env
  };
};

exports.envious = envious;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map