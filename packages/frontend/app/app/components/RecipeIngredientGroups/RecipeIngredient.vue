<script lang="ts">
export const RecipeIngredientsFieldsFragment = graphql(/* GraphQL */ `
  fragment RecipeIngredientsFields on Ingredient {
    id
    unit
    name
    notes
    quantity {
      id
      from
      to
      value
    }
  }
`);
</script>

<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';

const props = defineProps<{
  recipeIngredient: FragmentType<typeof RecipeIngredientsFieldsFragment>;
}>();

const ingredient = useFragment(
  RecipeIngredientsFieldsFragment,
  props.recipeIngredient
);

/**
 * Greatest Common Divisor
 */
const gcd = (a: number, b: number): number => {
  if (b < 0.0000001) return a;
  return gcd(b, a % b);
};

const value = computed(() => {
  let value = ingredient.quantity?.value || 0;
  if (value.toString().includes('.')) {
    let int = 0;

    if (value > 0) {
      int = parseInt(value.toString(), 10);
      value = value - int;
    }

    const len = value.toString().length - 2;
    let denominator = Math.pow(10, len);
    let numerator = value * denominator;
    const divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    return `${int || ''}<sup>${Math.floor(
      numerator
    )}</sup>&frasl;<sub>${Math.floor(denominator)}</sub>`;
  } else {
    return value;
  }
});
</script>

<template>
  <div class="flex">
    <div class="pr-4">
      {{ ingredient.name }}
      {{ ingredient.notes }}
    </div>
    <div class="ml-auto whitespace-nowrap text-gray-500">
      <span v-if="ingredient.quantity?.value" v-html="value"></span>
      <template v-if="ingredient.quantity?.from && ingredient.quantity?.to">
        {{ ingredient.quantity.from }} -
        {{ ingredient.quantity.to }}
      </template>
      <span>&nbsp;</span>
      <Unit v-if="ingredient.unit" :unit="ingredient.unit" />
    </div>
  </div>
</template>
