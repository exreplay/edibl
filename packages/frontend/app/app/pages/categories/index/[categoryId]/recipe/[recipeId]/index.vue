<script lang="ts" setup>
import { graphql } from '~/gql';

definePageMeta({
  middleware: ['auth']
});

const route = useRoute('categories-index-categoryId-recipe-recipeId');

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query getCategoryName($id: Int!) {
      category(id: $id) {
        name
      }
    }
  `),
  variables: {
    id: parseInt(route.params.categoryId as string, 10)
  }
});
</script>

<template>
  <RecipeDetail
    :recipe-id="route.params.recipeId"
    guide-route-name="categories-index-categoryId-recipe-recipeId-guide"
    :back="{
      name: 'categories-index-categoryId',
      params: { categoryId: route.params.categoryId }
    }"
    :back-to="data?.category?.name ?? ''"
  />
</template>
