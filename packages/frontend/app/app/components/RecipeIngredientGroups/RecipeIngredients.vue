<script lang="ts" setup>
import RecipeIngredient, {
  RecipeIngredientsFieldsFragment
} from './RecipeIngredient.vue';
import type { FragmentType } from '~/gql';

defineProps<{
  recipeIngredients?: FragmentType<typeof RecipeIngredientsFieldsFragment>[];
  selectable?: boolean;
}>();
</script>

<template>
  <ul>
    <li
      v-for="(ingredient, key) in recipeIngredients || []"
      :key="key"
      class="border-b border-gray-200 py-3 text-gray-700"
    >
      <RecipeIngredient :recipe-ingredient="ingredient" />
    </li>
  </ul>
</template>
