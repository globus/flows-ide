import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./Providers";
import AuthenticateRoute from "./AuthenticateRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AuthenticateRoute />
    </Providers>
  </StrictMode>,
);
