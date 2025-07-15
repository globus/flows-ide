import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobusAuth } from "@globus/react-auth-context";
import { Center, Text, Loader } from "@mantine/core";

/**
 * This route is used exclusively for handling the OAuth2 redirect.
 */
export default function Authenticate() {
  const auth = useGlobusAuth();
  const router = useRouter();
  const instance = auth.authorization;

  /**
   * Attempt to handle the incoming OAuth2 redirect.
   */
  useEffect(() => {
    async function attempt() {
      if (!instance) {
        return;
      }
      await instance.handleCodeRedirect({
        /**
         * We'll handle the redirect ourselves...
         */
        shouldReplace: false,
      });
    }
    attempt();
  }, [instance]);

  /**
   * Once the user is authenticated, refresh the tokens and redirect to the IDE.
   */
  useEffect(() => {
    async function redirect() {
      if (!instance || !auth.isAuthenticated) {
        return;
      }
      await instance.refreshTokens();
      return router.replace("/");
    }
    redirect();
  }, [router, instance, auth.isAuthenticated]);

  return (
    <>
      <Center mt="xl">
        <Loader mr="xs" size="sm" />
        <Text>Attempting to validate credentials...</Text>
      </Center>
    </>
  );
}
