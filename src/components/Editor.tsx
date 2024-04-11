"use client";
import MonacoEditor, {
  type Monaco,
  type EditorProps,
} from "@monaco-editor/react";

type InteralSettings = {
  enableExperimentalValidation: boolean;
};

function configureEditor(
  monaco: Monaco,
  settings: InteralSettings = {
    enableExperimentalValidation: true,
  },
) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    enableSchemaRequest: true,
    validate: true,
    schemaValidation: settings.enableExperimentalValidation
      ? "warning"
      : "ignore",
    schemas: [
      {
        uri: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}/schemas/flow_definition_schema.json`,
        fileMatch: ["*"],
      },
    ],
  });
}

export default function Editor(
  props: { settings?: InteralSettings } & EditorProps,
) {
  return (
    <MonacoEditor
      defaultLanguage="json"
      language="json"
      beforeMount={(monaco) => {
        configureEditor(monaco, props.settings);
      }}
      {...props}
    />
  );
}
