<script lang="ts" setup>
import { Provider } from '~/gql/graphql';

defineProps<{
  provider: Provider;
}>();
</script>

<template>
  <ProviderIconsCookidoo v-if="provider === Provider.Cookidoo" />
</template>
