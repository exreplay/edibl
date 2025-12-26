/* eslint-disable prefer-template */
import {
  createClient,
  cacheExchange,
  ssrExchange,
  errorExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
import { authExchange } from "@urql/exchange-auth";
import { devtoolsExchange } from "@urql/devtools";
import { useCookie, useNuxtApp } from "#app";
import { cacheExchange as cacheExchangeGraphcache } from "@urql/exchange-graphcache";
import { createClient as createWSClient } from "graphql-ws";
import Cookies from "js-cookie";
import fetch from "cross-fetch";
import type { Exchange } from "@urql/vue";
import type { Client } from "graphql-ws";
import type { UrqlProviderProps } from "./types";
import type { SSRData } from "@urql/core";

declare module "graphql" {
  interface GraphQLError {
    validationErrors: { [key: string]: string[] | undefined };
  }
}

const ssrKey = "__URQL_DATA__";

export function useCreateClient(
  { url, wsUrls, cache }: UrqlProviderProps,
  logout: () => Promise<void>,
) {
  const nuxt = useNuxtApp();
  const token = useCookie<string | null>("token");
  const exchanges: Exchange[] = [];

  const ssr = ssrExchange({
    isClient: import.meta.client,
  });

  let _cache: Exchange;

  if (cache) _cache = cacheExchangeGraphcache(cache);
  else _cache = cacheExchange;

  const auth = authExchange(async (utils) => {
    const bearerToken =
      token.value || (import.meta.client ? Cookies.get("token") : null);

    return {
      addAuthToOperation(operation) {
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${bearerToken}`,
        });
      },

      didAuthError(error) {
        return error.graphQLErrors.some(
          (e) =>
            e.extensions.code === "UNAUTHENTICATED" ||
            e.extensions.exception?.name === "JsonWebTokenError" ||
            e.extensions.exception?.name === "TokenExpiredError",
        );
      },

      async refreshAuth() {},
    };
  });

  if (import.meta.client) {
    nuxt.hook("app:created", () => {
      ssr.restoreData(nuxt.payload[ssrKey] as SSRData);
    });
  }

  if (import.meta.server) {
    nuxt.hook("app:rendered", () => {
      nuxt.payload[ssrKey] = ssr.extractData();
    });
  }

  exchanges.push(
    devtoolsExchange,
    _cache,
    auth,
    fetchExchange,
    ssr,
    errorExchange({
      onError: (error) => {
        error.graphQLErrors.forEach((err) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err.validationErrors = (err.originalError as any).validationErrors;
        });
      },
    }),
  );

  if (import.meta.client) {
    const wsClients: { client: Client; url: string }[] = [];

    for (const wsUrl of wsUrls) {
      const wsClient = createWSClient({
        url: wsUrl,
        connectionParams() {
          const bearerToken = Cookies.get("token") || null;

          return {
            authorization: bearerToken ? "Bearer " + bearerToken : "",
          };
        },
      });

      wsClients.push({
        client: wsClient,
        url: wsUrl,
      });
    }

    exchanges.push(
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => {
            for (const client of wsClients) {
              if (client.url === operation.context.url) {
                return {
                  unsubscribe: client.client.subscribe(operation, sink),
                };
              }
            }

            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return { unsubscribe: () => {} };
          },
        }),
      }),
    );
  }

  return createClient({
    url,
    exchanges,
    fetch,
    preferGetMethod: false,
  });
}
