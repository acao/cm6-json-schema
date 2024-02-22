import { JSONSchema7 } from "json-schema";
import { json5, json5Language, json5ParseLinter } from "codemirror-json5";
import { hoverTooltip } from "@codemirror/view";
import { json5Completion } from "./json-completion.js";
import { json5SchemaLinter } from "./json5-validation.js";
import { json5SchemaHover } from "./json5-hover.js";

import { linter } from "@codemirror/lint";
import { stateExtensions } from "./state.js";
import { handleRefresh } from "./json-validation.js";
import { MODES } from "./constants.js";

/**
 * Full featured cm6 extension for json5, including `codemirror-json5`
 * @group Bundled Codemirror Extensions
 */
export function json5Schema(schema?: JSONSchema7) {
  return [
    json5(),
    linter(json5ParseLinter()),
    linter(
      json5SchemaLinter({
        mode: MODES.JSON5,
      }),
      {
        needsRefresh: handleRefresh,
      }
    ),
    json5Language.data.of({
      autocomplete: json5Completion({
        mode: MODES.JSON5,
      }),
    }),
    hoverTooltip(
      json5SchemaHover({
        mode: MODES.JSON5,
      })
    ),
    stateExtensions(schema),
  ];
}
