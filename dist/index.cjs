"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  envious: () => envious
});
module.exports = __toCommonJS(src_exports);
var import_config = require("dotenv/config");
var import_value = require("@sinclair/typebox/value");
var import_os = __toESM(require("os"), 1);
var envious = (schema, defaultValues) => {
  const parsed = import_value.Value.Convert(schema, process.env);
  const errors = [...import_value.Value.Errors(schema, parsed)];
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
    throw new Error(errorTextParts.join(import_os.default.EOL));
  }
  const env = import_value.Value.Cast(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  envious
});
//# sourceMappingURL=index.cjs.map