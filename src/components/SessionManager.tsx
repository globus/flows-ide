import React, { useEffect } from "react";
import { Alert, AlertIcon, Link, useToast } from "@chakra-ui/react";
import { useGlobusAuth } from "@globus/react-auth-context";
import { useEditorStore } from "@/stores/editor";

export default function SessionManager() {
  const auth = useGlobusAuth();
  const toast = useToast();
  const editorStore = useEditorStore();

  useEffect(() => {
    async function attemptRefresh() {
      const results = await auth.authorization?.refreshTokens();
      const failed = results?.find((r) => r.value === null);
      if (failed) {
        toast({
          render: () => {
            return (
              <Alert status="error" variant="solid" rounded={4}>
                <AlertIcon /> Unable to refresh session – please&nbsp;
                <Link
                  textDecor="underline"
                  onClick={async () => {
                    editorStore.preserve();
                    await auth.authorization?.login();
                  }}
                >
                  sign in
                </Link>
                &nbsp;again.
              </Alert>
            );
          },
          position: "top",
          duration: null,
        });
      }
    }
    attemptRefresh();
  }, [auth.authorization, toast, editorStore]);

  return null;
}
