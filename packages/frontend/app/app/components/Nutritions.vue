<script lang="ts" setup>
import { useFragment, type FragmentType } from '~/gql';
import { RecipeDetailFieldsFragment } from './Recipe/Detail.vue';

const props = defineProps<{
  recipe: FragmentType<typeof RecipeDetailFieldsFragment>;
}>();
const recipe = useFragment(RecipeDetailFieldsFragment, props.recipe);

const currentServingSize = ref(1);

const servingSizeQuantity = computed(() => {
  return recipe?.servingSize?.quantity.value || 0;
});

const recipeNutritions = computed(() => {
  return recipe.nutritionGroups?.[0]?.nutritions || [];
});

const incrementServingSize = () => {
  if (currentServingSize.value < servingSizeQuantity.value)
    currentServingSize.value++;
};

const decrementServingSize = () => {
  if (currentServingSize.value > 1) currentServingSize.value--;
};
</script>

<template>
  <div>
    <small class="mb-4 block font-bold">
      <div class="flex items-center">
        <span class="mr-3">
          pro {{ currentServingSize }}
          <Unit :unit="recipe.servingSize.unit" />
        </span>
        <CustomButton
          size="small"
          class="mr-1"
          icon="pi pi-minus"
          @click="decrementServingSize"
        >
        </CustomButton>
        <CustomButton
          size="small"
          icon="pi pi-plus"
          @click="incrementServingSize"
        >
        </CustomButton>
      </div>
    </small>
    <div class="flex flex-wrap justify-around">
      <CircleProgress
        v-for="(nutrition, key) in recipeNutritions"
        :key="key"
        :radius="60"
        :progress="
          (nutrition.number * currentServingSize * 100) /
          (nutrition.number * servingSizeQuantity)
        "
        :stroke="4"
      >
        <div class="flex flex-col text-center leading-none">
          <span class="mb-2 font-bold">
            {{ Math.round(nutrition.number * currentServingSize) }} /
            <Unit :unit="nutrition.unit" />
          </span>
          <small class="text-gray-500">
            <NutritionType :type="nutrition.type" />
          </small>
        </div>
      </CircleProgress>
    </div>
  </div>
</template>

<i18n>
{
  "de": {
    "kJ": "Kilojoule",
    "kcal": "Kilokalorien",
    "protein": "Eiweiß",
    "carb2": "Kohlenhydrate",
    "fat": "Fett",
    "dietaryFibre": "Ballaststoffe"
  }
}
</i18n>
