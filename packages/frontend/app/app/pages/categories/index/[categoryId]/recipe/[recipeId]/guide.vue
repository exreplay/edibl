<script setup lang="ts">
import { RecipeGuideFieldsFragment } from '~/components/Recipe/Guide.vue';
import { graphql, useFragment } from '~/gql';

definePageMeta({
  middleware: ['auth']
});

const route = useRoute('categories-index-categoryId-recipe-recipeId-guide');

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query recipeGuide($id: Int!) {
      recipe(id: $id) {
        ...RecipeGuideFields
      }
    }
  `),
  variables: {
    id: parseInt(route.params.recipeId as string, 10)
  }
});
const recipe = useFragment(RecipeGuideFieldsFragment, data?.value?.recipe);

const titleBarStore = useTitleBarStore();
titleBarStore.back = {
  name: 'categories-index-categoryId-recipe-recipeId',
  params: route.params
};
titleBarStore.backTo = recipe?.title || '';
</script>

<template>
  <RecipeGuide v-if="data?.recipe" :recipe="data.recipe" />
</template>
