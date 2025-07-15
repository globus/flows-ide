import React, { useEffect } from "react";
import { Anchor, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useGlobusAuth } from "@globus/react-auth-context";
import { useEditorStore } from "@/stores/editor";

export default function SessionManager() {
  const auth = useGlobusAuth();
  const editorStore = useEditorStore();

  useEffect(() => {
    async function attemptRefresh() {
      const results = await auth.authorization?.refreshTokens();
      const failed = results?.find(
        (r) =>
          r.status === "rejected" ||
          (r.status === "fulfilled" && r.value === null),
      );
      if (failed) {
        const message = (
          <Text>
            Unable to refresh session – please&nbsp;
            <Anchor
              onClick={async () => {
                editorStore.preserve();
                await auth.authorization?.login();
              }}
            >
              sign in
            </Anchor>
            &nbsp;again.
          </Text>
        );
        notifications.show({
          title: "Session Refresh Failed",
          message,
          position: "top-center",
          autoClose: false,
          withCloseButton: false,
          color: "red",
        });
      }
    }
    attemptRefresh();
  }, [auth.authorization, editorStore]);

  return null;
}
