import { camelCase, startCase } from "lodash";

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

const ACTION_PROVIDERS_HOSTS = {
  SANDBOX: "https://sandbox.actions.automate.globus.org/",
  PRODUCTION: "https://actions.globus.org/",
};

const ACTION_PROVIDERS_HOST = ACTION_PROVIDERS_HOSTS.PRODUCTION;

export let BOOTSTRAPPED = false;

/**
 * The "library" of Globus-hosted Action Providers
 * @see https://docs.globus.org/api/flows/hosted-action-providers/
 */
export const ACTION_PROVIDERS: ActionProviderEntry[] = [
  {
    url: ACTION_PROVIDERS_HOST + "hello_world",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-hello-world/",
    /**
     * @todo Once the CORs errors are addressed, the "Hello World" definition can be removed.
     * We're just using the full definition here FPO.
     */
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
    url: "https://transfer.actions.globus.org/collection_info",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/collection-info/",
  },
  {
    url: "https://transfer.actions.globus.org/gcp/create_guest_collection",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/create-guest-collection-gcp/",
  },
  {
    url: "https://transfer.actions.globus.org/gcsv5/create_guest_collection",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/create-guest-collection-gcsv5/",
  },
  {
    url: "https://transfer.actions.globus.org/delete",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/delete/",
  },
  {
    url: "https://transfer.actions.globus.org/ls",
    documentation: "https://docs.globus.org/api/transfer/action-providers/ls/",
  },
  {
    url: "https://transfer.actions.globus.org/mkdir",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/mkdir/",
  },
  {
    url: "https://transfer.actions.globus.org/manage_permission",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/manage-permission/",
  },
  {
    url: "https://transfer.actions.globus.org/stat",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/stat/",
  },
  {
    url: "https://transfer.actions.globus.org/transfer",
    documentation:
      "https://docs.globus.org/api/transfer/action-providers/transfer/",
  },
  {
    url: "https://compute.actions.globus.org",
    documentation:
      "https://globus-compute.readthedocs.io/en/latest/actionprovider.html",
  },
  {
    url: ACTION_PROVIDERS_HOST + "search/ingest",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-search-ingest/",
  },
  {
    url: ACTION_PROVIDERS_HOST + "search/delete",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-search-delete/",
  },
  {
    url: ACTION_PROVIDERS_HOST + "notification/notify",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-notification-notify/",
  },
  {
    url: ACTION_PROVIDERS_HOST + "weboption/wait_for_option",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-weboption-wait-for-option/",
  },
  {
    url: ACTION_PROVIDERS_HOST + "expression_eval",
    documentation:
      "https://docs.globus.org/api/flows/hosted-action-providers/ap-expression-eval/",
  },
  {
    url: ACTION_PROVIDERS_HOST + "datacite/mint/basic_auth",
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

export function toPascalCase(str: string) {
  return startCase(camelCase(str)).replace(/ /g, "");
}
