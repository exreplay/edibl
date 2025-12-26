<script lang="ts" setup>
import { provide, ref } from 'vue';
import { provideClient } from '@urql/vue';
import { useCreateClient } from './useCreateClient';
import type { CacheExchangeOpts } from '@urql/exchange-graphcache';

const props = defineProps<{
  url: string;
  wsUrls: string[];
  cache?: Partial<CacheExchangeOpts>;
}>();
const emit = defineEmits<{
  /**
   * This function is called when a graphql request fails or will fail.
   * This happens when the jwt expires or the user is not logged in anymore (eg. 401).
   */
  (ev: 'logout', recreateClient: () => void): Promise<void>;
}>();

const client = ref<ReturnType<typeof useCreateClient>>();

/**
 * This function is called when we want to invalidate the cache and recreate the client.
 * This is used when the user logs out.
 */
function recreateClient() {
  client.value = useCreateClient(props, async () => {
    await emit('logout', recreateClient);
  });
}

/**
 * We also provide the recreateClient function to the children of this component.
 * This allows us to call it from anywhere in the app.
 * Use it by calling inject<() => void>('recreateClient') in a component.
 */
provide('recreateClient', recreateClient);

recreateClient();
provideClient(client as never);
</script>

<template>
  <slot />
</template>
