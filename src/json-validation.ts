import type { EditorView, ViewUpdate } from "@codemirror/view";
import { type Diagnostic, linter } from "@codemirror/lint";
import type { JSONSchema7 } from "json-schema";
import { Draft04, type Draft, type JsonError } from "json-schema-library";
import { joinWithOr } from "./utils/formatting.js";
import { JSONPointerData } from "./types.js";
import { parseJSONDocumentState } from "./utils/parseJSONDocument.js";
import { RequiredPick } from "./types.js";
import { getJSONSchema, schemaStateField } from "./state.js";

// return an object path that matches with the json-source-map pointer
const getErrorPath = (error: JsonError): string => {
  // if a pointer is present, return without #
  if (error?.data?.pointer && error?.data?.pointer !== "#") {
    return error.data.pointer.slice(1);
  }
  // return plain data.property if present
  if (error?.data?.property) {
    return `/${error.data.property}`;
  }
  // else, return the empty pointer to represent the whole document
  return "";
};

export type JSONValidationOptions = {
  formatError?: (error: JsonError) => string;
  jsonParser?: typeof parseJSONDocumentState;
};

type JSONValidationSettings = RequiredPick<JSONValidationOptions, "jsonParser">;

export const handleRefresh = (vu: ViewUpdate) => {
  return (
    vu.startState.field(schemaStateField) !== vu.state.field(schemaStateField)
  );
};

/**
 * Helper for simpler class instantiaton
 * @group Codemirror Extensions
 */
export function jsonSchemaLinter(options?: JSONValidationOptions) {
  const validation = new JSONValidation(options);
  return (view: EditorView) => {
    return validation.doValidation(view);
  };
}

export class JSONValidation {
  private schema: Draft | null = null;

  private options: JSONValidationSettings;
  public constructor(options?: JSONValidationOptions) {
    this.options = {
      jsonParser: parseJSONDocumentState,
      ...options,
    };

    // TODO: support other versions of json schema.
    // most standard schemas are draft 4 for some reason, probably
    // backwards compatibility
    //
    // ajv did not support draft 4, so I used json-schema-library
  }
  private get schemaTitle() {
    return this.schema!.getSchema().title ?? "json-schema";
  }

  // rewrite the error message to be more human readable
  private rewriteError = (error: JsonError): string => {
    if (error.code === "one-of-error") {
      return `Expected one of ${joinWithOr(
        error?.data?.errors,
        (data) => data.data.expected
      )}`;
    }
    if (error.code === "type-error") {
      return `Expected \`${
        error?.data?.expected && Array.isArray(error?.data?.expected)
          ? joinWithOr(error?.data?.expected)
          : error?.data?.expected
      }\` but received \`${error?.data?.received}\``;
    }
    const message = error.message.replaceAll("#/", "").replaceAll("/", ".");

    return message;
  };

  // validate using view as the linter extension signature requires
  public doValidation(view: EditorView) {
    const schema = getJSONSchema(view.state);
    if (!schema) {
      return [];
    }
    this.schema = new Draft04(schema);

    if (!this.schema) return [];
    const text = view.state.doc.toString();

    // ignore blank json strings
    if (!text || text.trim().length < 3) return [];

    const json = this.options.jsonParser(view.state);

    let errors: JsonError[] = [];
    try {
      errors = this.schema.validate(json.data);
    } catch {}
    if (!errors.length) return [];
    // reduce() because we want to filter out errors that don't have a pointer
    return errors.reduce((acc, error) => {
      const errorPath = getErrorPath(error);
      const pointer = json.pointers.get(errorPath) as JSONPointerData;
      if (pointer) {
        // if the error is a property error, use the key position
        const isKeyError =
          error.name === "NoAdditionalPropertiesError" ||
          error.name === "RequiredPropertyError";
        acc.push({
          from: isKeyError ? pointer.keyFrom : pointer.valueFrom,
          to: isKeyError ? pointer.keyTo : pointer.valueTo,
          // TODO: create a domnode and replace `` with <code></code>
          // renderMessage: () => error.message,
          message: this.rewriteError(error),
          severity: "error",
          source: this.schemaTitle,
        });
      } else {
        acc.push({
          from: 0,
          to: 0,
          message: this.rewriteError(error),
          severity: "error",
          source: this.schemaTitle,
        });
      }
      return acc;
    }, [] as Diagnostic[]);
  }
}
