<script lang="ts" setup>
import { ChartBarIcon, ClockIcon, UserIcon } from '@heroicons/vue/24/outline';
import { useFragment, type FragmentType } from '~/gql';
import { RecipeDetailFieldsFragment } from './Recipe/Detail.vue';
import { Difficulty } from '~/gql/graphql';

const props = defineProps<{
  recipe: FragmentType<typeof RecipeDetailFieldsFragment>;
}>();
const recipe = useFragment(RecipeDetailFieldsFragment, props.recipe);

const { t } = useI18n();

const activeTime = computed(() => {
  return (
    recipe.times?.find((t) => t.type === 'activeTime')?.quantity.value || 0
  );
});

const totalTime = computed(() => {
  return recipe.times?.find((t) => t.type === 'totalTime')?.quantity.value || 0;
});

const difficulty = computed(() => {
  switch (recipe.difficulty) {
    case Difficulty.Easy:
      return t('difficulty.easy');
    case Difficulty.Medium:
      return t('difficulty.medium');
    case Difficulty.Advanced:
      return t('difficulty.advanced');
  }
});
</script>

<template>
  <div class="-mx-4 mt-3 flex flex-wrap text-left text-sm">
    <div class="flex w-1/2 items-center px-4 py-2 sm:w-1/4 md:w-1/2">
      <IconBg class="mr-2 bg-pink-100">
        <ChartBarIcon class="h-4 w-4 text-pink-600" />
      </IconBg>
      <div class="flex flex-col">
        <small class="text-gray-500">Schwierigkeit</small>
        <span class="whitespace-nowrap">
          {{ difficulty }}
        </span>
      </div>
    </div>
    <div class="flex w-1/2 items-center px-4 py-2 sm:w-1/4 md:w-1/2">
      <IconBg class="mr-2 bg-pink-100">
        <ClockIcon class="h-4 w-4 text-pink-600" />
      </IconBg>
      <div class="flex flex-col">
        <small class="text-gray-500">Arbeitszeit</small>
        <ConvertedTime :time="activeTime" />
      </div>
    </div>
    <div class="flex w-1/2 items-center px-4 py-2 sm:w-1/4 md:w-1/2">
      <IconBg class="mr-2 bg-pink-100">
        <ClockIcon class="h-4 w-4 text-pink-600" />
      </IconBg>
      <div class="flex flex-col">
        <small class="text-gray-500">Gesamtzeit</small>
        <ConvertedTime :time="totalTime" />
      </div>
    </div>
    <div class="flex w-1/2 items-center px-4 py-2 sm:w-1/4 md:w-1/2">
      <IconBg class="mr-2 bg-pink-100">
        <UserIcon class="h-4 w-4 text-pink-600" />
      </IconBg>
      <div class="flex flex-col">
        <small class="text-gray-500">Portionen</small>
        <span class="whitespace-nowrap">
          {{ recipe.servingSize.quantity.value }}
          <Unit :unit="recipe.servingSize.unit" />
        </span>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "de": {
    "difficulty": {
      "easy": "Einfach",
      "medium": "Medium",
      "advanced": "Aufwändig"
    }
  }
}
</i18n>
