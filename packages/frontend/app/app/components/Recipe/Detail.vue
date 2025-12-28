<script lang="ts" setup>
import { graphql, useFragment } from '~/gql';
import type { RouteNamedMap } from 'vue-router/auto-routes';
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  recipeId: string;
  guideRouteName: keyof RouteNamedMap;
  back: RouteLocationRaw;
  backTo: string;
}>();

const showActions = ref(false);
const content = ref<HTMLDivElement | null>(null);

const titleBarStore = useTitleBarStore();

const { back, backTo } = toRefs(props);

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query recipeDetail($id: Int!) {
      recipe(id: $id) {
        ...RecipeDetailFields
      }
    }
  `),
  variables: {
    id: parseInt(props.recipeId, 10)
  }
});
const recipe = useFragment(RecipeDetailFieldsFragment, data.value?.recipe);

titleBarStore.back = back.value;
titleBarStore.backTo = backTo.value;

onMounted(() => {
  titleBarStore.scrollTrigger = content.value;
});
</script>

<script lang="ts">
export const RecipeDetailFieldsFragment = graphql(/* GraphQL `*/ `
  fragment RecipeDetailFields on Recipe {
    id
    title
    difficulty
    assets {
      ...AssetFields
    }
    times {
      id
      type
      quantity {
        id
        value
      }
    }
    additionalInformation {
      id
      content
    }
    servingSize {
      id
      quantity {
        id
        value
      }
      unit
    }
    nutritionGroups {
      id
      nutritions {
        id
        type
        number
        unit
      }
    }
    ingredientGroups {
      ...RecipeIngredientGroupFields
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
    <Title>{{ recipe.title }}</Title>

    <portal to="titleBarRight">
      <CustomButton v-slot="slotProps" size="small-narrow" as-child>
        <NuxtLinkLocale
          :to="{
            name: guideRouteName,
            params: {
              recipeId: recipe.id.toString()
            }
          }"
          v-bind="slotProps.a11yAttrs"
          :class="slotProps.class"
        >
          <i class="pi pi-play" />
        </NuxtLinkLocale>
      </CustomButton>
      <CustomButton
        size="small-narrow"
        class="ml-1"
        icon="pi pi-ellipsis-h"
        @click="showActions = true"
      />
    </portal>

    <RecipeDetailActions
      v-if="data?.recipe"
      v-model="showActions"
      :recipe="data?.recipe"
    />

    <RecipeDetailHeader :assets="recipe.assets">
      <h1 ref="title" class="text-2xl font-bold text-gray-900 lg:text-4xl">
        {{ recipe.title }}
      </h1>

      <GeneralInformation v-if="data?.recipe" :recipe="data?.recipe" />
    </RecipeDetailHeader>

    <div
      ref="content"
      :class="[
        'relative z-10 -mt-10 overflow-x-hidden rounded-t-3xl bg-white shadow-lg-top md:h-auto md:px-4'
      ]"
    >
      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full p-6 text-center md:hidden">
            <h2 class="text-2xl font-bold text-gray-900">{{ recipe.title }}</h2>
            <GeneralInformation v-if="data?.recipe" :recipe="data.recipe" />
          </div>

          <div class="w-full px-4 pb-4 md:bg-gray-100 md:p-10 lg:w-1/3">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-gray-900">Nährwerte</h3>
              <Nutritions v-if="data?.recipe" :recipe="data.recipe" />
            </div>

            <div class="prose mb-2 lg:prose-lg">
              <h3>Zutaten</h3>
            </div>

            <RecipeIngredientGroups
              :recipe-ingredient-groups="recipe.ingredientGroups || []"
            />
          </div>

          <div class="prose w-full p-4 lg:prose-lg md:p-10 lg:w-2/3">
            <h3 class="mt-0!">Zubereitung</h3>

            <div v-for="(group, key) in recipe.stepGroups || []" :key="key">
              <h4>{{ group.title }}</h4>

              <ol>
                <li
                  v-for="(step, key2) in group.steps || []"
                  :key="key2"
                  v-html="step.text"
                ></li>
              </ol>
            </div>

            <template
              v-if="
                recipe.additionalInformation &&
                recipe.additionalInformation.length > 0
              "
            >
              <h3>Tipps & Tricks</h3>

              <div
                v-for="(information, key) of recipe.additionalInformation || []"
                :key="`information${key}`"
                class="mb-4"
                v-html="information.content"
              ></div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
