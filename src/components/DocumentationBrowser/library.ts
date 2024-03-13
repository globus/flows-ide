export type ActionProviderEntry = {
  url: string;
  documentation: string;
  definition?: {
    admin_contact: string;
    administered_by: string[];
    api_version: string;
    description: string | null;
    event_types: string[] | null;
    globus_auth_scope: string;
    input_schema: unknown;
    keywords: string[] | null;
    log_supported: boolean;
    maximum_deadline: string;
    runnable_by: string[];
    subtitle: string;
    synchronous: boolean;
    title: string;
    types: string[];
    visible_to: string[];
    [key: string]: unknown;
  };
};

export let BOOTSTRAPPED = false;

/**
 * The "library" of Globus-hosted Action Providers
 * @see https://docs.globus.org/api/flows/hosted-action-providers/
 */
export const ACTION_PROVIDERS: ActionProviderEntry[] = [
  {
    url: "https://actions.globus.org/hello_world",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-hello-world/",
    definition: {
      admin_contact: "support@globus.org",
      administered_by: [],
      api_version: "1.0",
      description: null,
      event_types: null,
      globus_auth_scope:
        "https://auth.globus.org/scopes/actions.globus.org/hello_world",
      input_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        additionalProperties: false,
        properties: {
          echo_string: {
            type: "string",
          },
          required_dependent_scope: {
            type: "string",
          },
          sleep_time: {
            type: "integer",
          },
        },
        type: "object",
      },
      keywords: null,
      log_supported: false,
      maximum_deadline: "P30D",
      runnable_by: ["all_authenticated_users"],
      subtitle: "An Action responding Hello to an input value",
      synchronous: false,
      title: "Hello World",
      types: ["ACTION"],
      visible_to: ["public"],
    },
  },
  {
    url: "https://actions.globus.org/search/ingest",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-search-ingest/",
  },
  {
    url: "https://actions.globus.org/search/delete",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-search-delete/",
  },
  {
    url: "https://actions.globus.org/notification/notify",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-notification-notify/",
  },
  {
    url: "https://actions.globus.org/weboption/wait_for_option",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-weboption-wait-for-option/",
  },
  {
    url: "https://actions.globus.org/expression_eval",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-expression-eval/",
  },
  {
    url: "https://actions.globus.org/datacite/mint/basic_auth",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-datacite-mint/",
  },
];

let providers: ActionProviderEntry[] = [...ACTION_PROVIDERS];

export async function fetchActionProviders() {
  if (BOOTSTRAPPED) {
    return providers;
  }

  const promises = providers.map(async (ap) => {
    if (ap.definition) {
      return;
    }
    let definition = {};
    try {
      const response = await fetch(ap.url);
      definition = await response.json();
    } catch (e) {}
    ap.definition = definition as unknown as ActionProviderEntry["definition"];
  });
  await Promise.all(promises);

  BOOTSTRAPPED = true;
  return providers;
}
