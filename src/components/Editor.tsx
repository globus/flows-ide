"use client";
import MonacoEditor from "@monaco-editor/react";

export default function Editor(props: any[]) {
  return <MonacoEditor defaultLanguage="json" language="json" {...props} />;
}
