"use client";

import MonacoEditor, {
  type Monaco,
  type EditorProps,
} from "@monaco-editor/react";
import { ValidateButton } from "./Validate";
import { Box } from "@mantine/core";

export const MODES = {
  DEFINITION: "DEFINITION",
  INPUT_SCHEMA: "INPUT_SCHEMA",
} as const;

export type SupportedModes = keyof typeof MODES;

function isDefinitionMode(settings?: InternalSettings) {
  return settings?.mode === MODES.DEFINITION || !settings?.mode;
}

type InternalSettings = {
  mode?: SupportedModes;
  enableExperimentalValidation?: boolean;
};

function configureEditor(
  monaco: Monaco,
  settings: InternalSettings = {
    mode: MODES.DEFINITION,
    enableExperimentalValidation: true,
  },
) {
  console.log("Configuring editor with settings", settings);
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    enableSchemaRequest: true,
    validate: true,
    schemaValidation: settings.enableExperimentalValidation
      ? "warning"
      : "ignore",
    schemas: [
      {
        uri: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}/schemas/flow_definition_schema.json`,
        fileMatch: ["definition.json"],
      },
      {
        uri: `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}/schemas/input_schema_schema.json`,
        fileMatch: ["input-schema.json"],
      },
    ],
  });
}

export default function Editor(
  props: { settings?: InternalSettings } & EditorProps,
) {
  return (
    <>
      <Box pos="relative">
        <MonacoEditor
          defaultLanguage="json"
          language="json"
          beforeMount={(monaco) => {
            configureEditor(monaco, props.settings);
          }}
          {...props}
        />
        {isDefinitionMode(props.settings) && (
          <Box
            pos="absolute"
            bottom={10}
            right={20}
            style={{
              zIndex: 9,
            }}
          >
            <ValidateButton />
          </Box>
        )}
      </Box>
    </>
  );
}
