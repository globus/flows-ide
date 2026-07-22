/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public base path the app is served from (e.g. `/flows-ide/`). */
  readonly VITE_BASE_PATH?: string;
  readonly VITE_GLOBUS_CLIENT_ID?: string;
  readonly VITE_GLOBUS_SCOPES?: string;
  readonly VITE_GLOBUS_ENVIRONMENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
