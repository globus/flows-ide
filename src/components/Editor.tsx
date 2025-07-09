"use client";

import MonacoEditor, {
  type Monaco,
  type EditorProps,
} from "@monaco-editor/react";
import { ValidateButton } from "./Validate";
import { Box } from "@chakra-ui/react";

export const MODES = {
  DEFINITION: "DEFINITION",
  INPUT_SCHEMA: "INPUT_SCHEMA",
} as const;

export type SupportedModes = keyof typeof MODES;

function isDefinitionMode(settings?: InteralSettings) {
  return settings?.mode === MODES.DEFINITION || !settings?.mode;
}

type InteralSettings = {
  mode?: SupportedModes;
  enableExperimentalValidation?: boolean;
};

function configureEditor(
  monaco: Monaco,
  settings: InteralSettings = {
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
  props: { settings?: InteralSettings } & EditorProps,
) {
  return (
    <>
      <Box pos="relative" h="100%">
        <MonacoEditor
          defaultLanguage="json"
          language="json"
          beforeMount={(monaco) => {
            configureEditor(monaco, props.settings);
          }}
          {...props}
        />
        {isDefinitionMode(props.settings) && (
          <Box pos="absolute" bottom={5} right={10} zIndex={10}>
            <ValidateButton />
          </Box>
        )}
      </Box>
    </>
  );
}
