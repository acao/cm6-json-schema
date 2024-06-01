import { CompletionContext } from "@codemirror/autocomplete";
import { MODES } from "../constants";
import { JSONCompletion, JSONCompletionOptions } from "../features/completion";

/**
 * provides a JSON schema enabled autocomplete extension for codemirror and json5
 * @group Codemirror Extensions
 */
export function json5Completion(
  opts: Omit<JSONCompletionOptions, "mode"> = {}
) {
  const completion = new JSONCompletion({ ...opts, mode: MODES.JSON5 });
  return function jsonDoCompletion(ctx: CompletionContext) {
    return completion.doComplete(ctx);
  };
}
