"use client";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";

function configureEditor(monaco: Monaco) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    enableSchemaRequest: true,
    validate: true,
    schemas: [
      {
        uri: "https://gist.githubusercontent.com/jbottigliero/e7276bbdb5e56974e49ea69f91660c4a/raw/690956b1102341232741e8aeb1e7ce80adc7d1cd/flow_definition_schema.json",
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
