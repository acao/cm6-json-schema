[codemirror-json-schema](../README.md) / json5

# Module: json5

## Table of contents

### Bundled Codemirror Extensions

- [json5Schema](json5.md#json5schema)

### Codemirror Extensions

- [json5Completion](json5.md#json5completion)
- [json5SchemaHover](json5.md#json5schemahover)
- [json5SchemaLinter](json5.md#json5schemalinter)

### Utilities

- [parseJSON5Document](json5.md#parsejson5document)
- [parseJSON5DocumentState](json5.md#parsejson5documentstate)

## Bundled Codemirror Extensions

### json5Schema

▸ **json5Schema**(`schema`): `Extension`[]

Full featured cm6 extension for json5, including `codemirror-json5`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `schema` | `JSONSchema7` |

#### Returns

`Extension`[]

#### Defined in

[json5-bundled.ts:14](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/json5-bundled.ts#L14)

## Codemirror Extensions

### json5Completion

▸ **json5Completion**(`schema`, `opts?`): (`ctx`: `CompletionContext`) => `CompletionResult`

provides a JSON schema enabled autocomplete extension for codemirror and json5

#### Parameters

| Name     | Type                                       |
| :------- | :----------------------------------------- |
| `schema` | `JSONSchema7`                              |
| `opts`   | `Omit`<`JSONCompletionOptions`, `"mode"`\> |

#### Returns

`fn`

▸ (`ctx`): `CompletionResult`

##### Parameters

| Name  | Type                |
| :---- | :------------------ |
| `ctx` | `CompletionContext` |

##### Returns

`CompletionResult`

#### Defined in

[json-completion.ts:820](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/json-completion.ts#L820)

---

### json5SchemaHover

▸ **json5SchemaHover**(`schema`, `options?`): (`view`: `EditorView`, `pos`: `number`, `side`: `Side`) => `Promise`<`null` \| `Tooltip`\>

Instantiates a JSONHover instance with the JSON5 mode

#### Parameters

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `schema`   | `JSONSchema7`                           |
| `options?` | [`HoverOptions`](index.md#hoveroptions) |

#### Returns

`fn`

▸ (`view`, `pos`, `side`): `Promise`<`null` \| `Tooltip`\>

##### Parameters

| Name   | Type         |
| :----- | :----------- |
| `view` | `EditorView` |
| `pos`  | `number`     |
| `side` | `Side`       |

##### Returns

`Promise`<`null` \| `Tooltip`\>

#### Defined in

[json5-hover.ts:13](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/json5-hover.ts#L13)

---

### json5SchemaLinter

▸ **json5SchemaLinter**(`schema`, `options?`): (`view`: `EditorView`) => `Diagnostic`[]

Instantiates a JSONValidation instance with the JSON5 mode

#### Parameters

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `schema`   | `JSONSchema7`                                             |
| `options?` | [`JSONValidationOptions`](index.md#jsonvalidationoptions) |

#### Returns

`fn`

▸ (`view`): `Diagnostic`[]

##### Parameters

| Name   | Type         |
| :----- | :----------- |
| `view` | `EditorView` |

##### Returns

`Diagnostic`[]

#### Defined in

[json5-validation.ts:10](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/json5-validation.ts#L10)

## Utilities

### parseJSON5Document

▸ **parseJSON5Document**(`jsonString`): `Object`

Mimics the behavior of `json-source-map`'s `parseJSONDocument` function, for json5!

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `jsonString` | `string` |

#### Returns

`Object`

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `data`     | `any`                                         |
| `pointers` | [`JSONPointersMap`](index.md#jsonpointersmap) |

#### Defined in

[utils/parseJSON5Document.ts:28](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/utils/parseJSON5Document.ts#L28)

---

### parseJSON5DocumentState

▸ **parseJSON5DocumentState**(`state`): `Object`

Return parsed data and json5 pointers for a given codemirror EditorState

#### Parameters

| Name    | Type          |
| :------ | :------------ |
| `state` | `EditorState` |

#### Returns

`Object`

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `data`     | `any`                                         |
| `pointers` | [`JSONPointersMap`](index.md#jsonpointersmap) |

#### Defined in

[utils/parseJSON5Document.ts:14](https://github.com/acao/codemirror-json-schema/blob/4c9ca0a/src/utils/parseJSON5Document.ts#L14)
