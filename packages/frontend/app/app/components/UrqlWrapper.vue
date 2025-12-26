<script lang="ts" setup>
import { cacheUpdates } from '~/graphql/cacheUpdates';
import rawSchema from '~/graphql/introspection.json?raw';

const schema = JSON.parse(rawSchema);

const {
  public: { backendUrl, graphqlWs }
} = useRuntimeConfig();
</script>

<template>
  <UrqlProvider
    :url="`${backendUrl}/graphql`"
    :ws-urls="[graphqlWs]"
    :cache="{
      schema,
      updates: cacheUpdates
    }"
  >
    <slot />
  </UrqlProvider>
</template>
