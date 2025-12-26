<script lang="ts">
export const RecipeIngredientGroupFieldsFragment = graphql(/* GraphQL */ `
  fragment RecipeIngredientGroupFields on IngredientGroup {
    id
    title
    ingredients {
      ...RecipeIngredientsFields
    }
  }
`);
</script>

<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import RecipeIngredients from './RecipeIngredients.vue';

defineProps<{
  recipeIngredientGroups: FragmentType<
    typeof RecipeIngredientGroupFieldsFragment
  >[];
}>();
</script>

<template>
  <div>
    <div
      v-for="(group, key) in useFragment(
        RecipeIngredientGroupFieldsFragment,
        recipeIngredientGroups
      )"
      :key="key"
      class="mb-6"
    >
      <h4 class="mb-1 text-lg font-bold text-gray-900">{{ group.title }}</h4>
      <RecipeIngredients :recipe-ingredients="group.ingredients" />
    </div>
  </div>
</template>
