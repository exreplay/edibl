<script lang="ts" setup>
import { ShoppingListFieldsFragment } from '~/components/ShoppingListItem.vue';
import { graphql, makeFragmentData, useFragment } from '~/gql';

const listHeadline = ref<HTMLHeadingElement | null>(null);
const titleBarStore = useTitleBarStore();
// const runtimeConfig = useRuntimeConfig();

titleBarStore.back = null;

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query shoppingList {
      shoppingList {
        ...ShoppingListFields
      }
    }
  `),
  variables: {}
});
const shoppingList = useFragment(
  ShoppingListFieldsFragment,
  data.value?.shoppingList
);

// const { data: subscriptionResult } = useShoppingListUpdatedSubscription({
//   context: {
//     url: runtimeConfig.public.GRAPHQL_WS
//   }
// });

// watch(
//   subscriptionResult,
//   (data) => {
//     shoppingList.value = data?.shoppingListUpdated || [];
//   },
//   { immediate: false }
// );

onMounted(() => {
  titleBarStore.scrollTrigger = listHeadline.value as never;
});
</script>

<template>
  <div class="px-4 pb-safe-area-bottom">
    <Title>Einkaufsliste</Title>

    <div class="container mx-auto pt-safe-area-top-nav">
      <portal to="titleBarTitle">Einkaufsliste</portal>
      <h2 ref="listHeadline" class="text-3xl font-bold text-gray-900">
        Einkaufsliste
      </h2>
      <transition-group
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-0 translate-x-0"
        enter-active-class="transition-all duration-300"
        leave-from-class="opacity-0 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
        leave-active-class="transition-all duration-300"
      >
        <div v-for="item in shoppingList || []" :key="item.id">
          <ShoppingListItem
            :item="makeFragmentData(item, ShoppingListFieldsFragment)"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>
