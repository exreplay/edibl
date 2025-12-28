<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import type { RouteParams } from 'vue-router';

const props = defineProps<{
  recipe: FragmentType<typeof RecipeFragment>;
  detailRouteName?: string;
  detailRouteParams?: RouteParams;
}>();
defineEmits<
  (e: 'delete', recipe: FragmentType<typeof RecipeFragment>) => void
>();

const {
  public: { backendUrl }
} = useRuntimeConfig();
const recipeObj = useFragment(RecipeFragment, props.recipe);

const totalTime = computed(() => {
  return (
    recipeObj.times?.find((t) => t.type === 'totalTime')?.quantity.value || 0
  );
});
</script>

<script lang="ts">
export const RecipeFragment = graphql(/* GraphQL */ `
  fragment RecipeFragment on Recipe {
    id
    title
    provider
    assets {
      id
      image
    }
    servingSize {
      id
      unit
      quantity {
        id
        value
      }
    }
    times {
      id
      type
      quantity {
        id
        value
      }
    }
  }
`);
</script>

<template>
  <div>
    <VueSwipeActionsSwipeOut
      class="my-4 overflow-hidden rounded-xl shadow-md transition-colors duration-150 hover:bg-gray-100 hover:text-gray-500 hover:shadow-lg"
      style="transform: translateZ(0)"
    >
      <NuxtLinkLocale
        :to="{
          name: detailRouteName || 'recipes-index-recipeId',
          params: { recipeId: recipeObj.id, ...detailRouteParams }
        }"
        class="flex cursor-pointer items-center"
      >
        <div class="relative w-32 shrink-0 self-stretch">
          <img
            :src="`${backendUrl}/images/recipes/${recipeObj.assets[0].image}`"
            class="lazyImage absolute left-0 top-0 h-full w-full border-0 object-cover"
          />
        </div>

        <div class="flex w-full items-center p-4">
          <div class="prose">
            <h4>{{ recipeObj.title }}</h4>

            <span class="mb-1 flex items-center text-sm text-gray-500">
              <i class="mr-2 text-pink-400 pi pi-clock" />
              <ConvertedTime :time="totalTime" />
            </span>

            <span class="flex items-center text-sm text-gray-500">
              <i class="mr-2 text-pink-400 pi pi-user" />
              {{ recipeObj.servingSize.quantity.value }}
              <span>&nbsp;</span>
              <Unit :unit="recipeObj.servingSize.unit" />
            </span>
          </div>

          <ProviderIcons
            :provider="recipeObj.provider"
            class="ml-auto h-full w-20"
          />
        </div>
      </NuxtLinkLocale>

      <template #right>
        <div
          class="swipeout-action group flex cursor-pointer items-center justify-center bg-gray-50 p-6"
          @click.prevent="$emit('delete', recipe)"
        >
          <IconBg class="bg-red-100 group-hover:shadow-md">
            <i class="w-h4 h-4 text-red-600 pi pi-trash" />
          </IconBg>
        </div>
      </template>
    </VueSwipeActionsSwipeOut>
  </div>
</template>
