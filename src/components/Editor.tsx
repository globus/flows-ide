"use client";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";

function configureEditor(monaco: Monaco) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    enableSchemaRequest: true,
    validate: true,
    schemas: [
      {
        uri: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}/schemas/flow_definition_schema.json`,
        fileMatch: ["*"],
      },
    ],
  });
}

export default function Editor(props: any[]) {
  return (
    <MonacoEditor
      defaultLanguage="json"
      language="json"
      beforeMount={configureEditor}
      {...props}
    />
  );
}
