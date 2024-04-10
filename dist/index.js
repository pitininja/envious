// src/index.ts
import "dotenv/config";
import { Value } from "@sinclair/typebox/value";
import Os from "os";
var envious = (schema, defaultValues) => {
  const parsed = Value.Convert(schema, process.env);
  const errors = [...Value.Errors(schema, parsed)];
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
    throw new Error(errorTextParts.join(Os.EOL));
  }
  const env = Value.Cast(
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
export {
  envious
};
//# sourceMappingURL=index.js.map