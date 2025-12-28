<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';

interface Dots {
  group: number;
  groupStep: number;
}

const props = defineProps<{
  recipe: FragmentType<typeof RecipeGuideFieldsFragment>;
}>();
const recipe = useFragment(RecipeGuideFieldsFragment, props.recipe);

const currentGroup = ref(0);
const currentGroupStep = ref(0);
const showIngredients = ref(true);
const content = ref<HTMLDivElement | null>(null);
const titleBarStore = useTitleBarStore();

onMounted(() => {
  titleBarStore.scrollTrigger = content.value;
});

const dots = computed(() => {
  return (
    recipe.stepGroups?.reduce((p, n, i) => {
      return [
        ...p,
        ...n.steps.reduce((p1, _, i1) => {
          return [
            ...p1,
            {
              group: i,
              groupStep: i1
            }
          ];
        }, [] as Dots[])
      ];
    }, [] as Dots[]) || []
  );
});

const currentFlattenedStep = computed(() => {
  return (
    dots.value.reduce((p, n, i) => {
      if (
        currentGroup.value === n.group &&
        currentGroupStep.value === n.groupStep
      )
        return i;
      else return p;
    }, 0) + 1
  );
});

const groupsCount = computed(() => {
  return recipe.stepGroups?.length || 0;
});

const currentStepIngredients = computed(() => {
  return recipe.ingredientGroups?.[currentGroup.value].ingredients;
});

const currentStepGroup = computed(() => {
  return recipe.stepGroups?.[currentGroup.value];
});

const currentStepsCount = computed(() => {
  return currentStepGroup.value?.steps.length || 0;
});

const currentStep = computed(() => {
  return currentStepGroup.value?.steps[currentGroupStep.value];
});

const dotClicked = (group: number, groupStep: number) => {
  currentGroup.value = group;
  currentGroupStep.value = groupStep;
};

const next = () => {
  const tmp = currentGroupStep.value + 1;

  if (
    tmp > currentStepsCount.value - 1 &&
    currentGroup.value < groupsCount.value - 1
  ) {
    currentGroupStep.value = 0;
    currentGroup.value++;
  } else if (tmp <= currentStepsCount.value - 1) {
    currentGroupStep.value = tmp;
  }
};

const previous = () => {
  const tmp = currentGroupStep.value - 1;

  if (tmp < 0 && currentGroup.value > 0) {
    currentGroup.value--;
    currentGroupStep.value = currentStepsCount.value - 1;
  } else if (tmp >= 0) {
    currentGroupStep.value = tmp;
  }
};
</script>

<script lang="ts">
export const RecipeGuideFieldsFragment = graphql(/* GraphQL */ `
  fragment RecipeGuideFields on Recipe {
    id
    title
    assets {
      ...AssetFields
    }
    ingredientGroups {
      id
      title
      ingredients {
        ...RecipeIngredientsFields
      }
    }
    stepGroups {
      id
      title
      steps {
        id
        title
        text
      }
    }
  }
`);
</script>

<template>
  <div v-if="recipe">
    <portal to="titleBarBackTo">{{ recipe.title }}</portal>

    <RecipeDetailHeader :assets="recipe.assets">
      <h1
        v-if="currentStepGroup"
        ref="title"
        class="text-2xl font-bold text-gray-900 lg:text-4xl"
      >
        <template v-if="currentStepGroup.title">
          {{ currentStepGroup.title }}
        </template>
        <template v-else> Schritt {{ currentFlattenedStep }} </template>
      </h1>
      <div class="-mx-2 mt-3 flex flex-wrap">
        <div
          v-for="(d, i) in dots"
          :key="i"
          :class="[
            'm-2 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-sm',
            currentFlattenedStep - 1 !== i && 'opacity-25'
          ]"
          @click="dotClicked(d.group, d.groupStep)"
        >
          <template v-if="i < dots.length - 1">{{ i + 1 }}</template>
          <template v-else>
            <i class="pi pi-flag" />
          </template>
        </div>
      </div>
    </RecipeDetailHeader>

    <div
      ref="content"
      :class="[
        'relative z-10 -mt-10 overflow-x-hidden overflow-y-visible rounded-t-3xl bg-white pb-16 shadow-lg-top md:h-auto md:px-4'
      ]"
    >
      <div v-if="currentStepGroup" class="container mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full p-6 text-center md:hidden">
            <h2 class="mb-3 text-2xl font-bold text-gray-900">
              <template v-if="currentStepGroup.title">
                {{ currentStepGroup.title }}
              </template>
              <template v-else> Schritt {{ currentFlattenedStep }} </template>
            </h2>
            <div class="-mx-2 flex flex-wrap justify-center">
              <div
                v-for="(d, i) in dots"
                :key="i"
                :class="[
                  'm-2 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-sm',
                  currentFlattenedStep - 1 !== i && 'opacity-25'
                ]"
                @click.stop="dotClicked(d.group, d.groupStep)"
              >
                <template v-if="i < dots.length - 1">{{ i + 1 }}</template>
                <template v-else>
                  <i class="pi pi-flag" />
                </template>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:py-10">
            <div class="prose lg:prose-lg">
              <div v-if="currentStep" v-html="currentStep.text"></div>
            </div>
            <div class="mt-6">
              <div
                class="mb-2 flex cursor-pointer items-center"
                @click="showIngredients = !showIngredients"
              >
                <h3 class="text-xl font-bold text-gray-900">Zutaten</h3>
                <i
                  v-if="showIngredients"
                  class="pi pi-chevron-up ml-auto h-6 w-6"
                />
                <i v-else class="pi pi-chevron-down ml-auto h-6 w-6" />
              </div>
              <RecipeIngredientGroupsRecipeIngredients
                v-if="showIngredients"
                :recipe-ingredients="currentStepIngredients"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pointer-events-none fixed bottom-15 left-0 z-20 w-full p-4">
      <div class="container mx-auto flex">
        <CustomButton
          v-if="currentGroup > 0 || currentGroupStep > 0"
          class="pointer-events-auto mr-3 shadow-md"
          @click="previous"
        >
          Zurück
        </CustomButton>
        <CustomButton
          v-if="
            currentGroup !== groupsCount - 1 ||
            currentGroupStep !== currentStepsCount - 1
          "
          class="pointer-events-auto ml-auto shadow-md"
          @click="next"
        >
          Weiter
        </CustomButton>
      </div>
    </div>
  </div>
</template>
