<script lang="ts" setup>
import { PlayIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
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

const img = useImage();
const titleBarStore = useTitleBarStore();
const {
  public: { backendUrl }
} = useRuntimeConfig();

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

const headerBackground = computed(() => {
  const imgUrl = img(
    `${backendUrl}/images/recipes/${recipe?.assets[0]?.image}`
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

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
      id
      image
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
      <Button
        color="pink"
        class="ml-auto text-xs"
        :to="{
          name: guideRouteName,
          params: {
            recipeId: recipe.id.toString()
          }
        }"
        small
        narrower
      >
        <PlayIcon class="h-4 w-4 drop-shadow-md" />
      </Button>
      <Button
        color="pink"
        class="ml-1 text-xs"
        small
        narrower
        @click="showActions = true"
      >
        <EllipsisHorizontalIcon class="h-4 w-4 drop-shadow-md" />
      </Button>
    </portal>

    <RecipeDetailActions v-model="showActions" :recipe="recipe" />

    <div
      class="sticky top-0 z-0 h-[40vh] w-full overflow-hidden bg-gray-100 md:h-50vh md:max-h-125 md:min-h-100 md:pt-16"
    >
      <div
        class="absolute left-0 top-0 z-0 hidden h-full w-full scale-110 bg-pink-50 bg-cover bg-center blur-3xl md:block"
        :style="headerBackground"
      ></div>
      <div class="relative z-10 h-full md:px-4">
        <div class="mx-auto flex h-full md:container">
          <div
            class="mx-auto flex h-full w-full max-w-5xl flex-wrap overflow-hidden bg-white md:rounded-3xl"
          >
            <div
              class="order-2 hidden w-full flex-col p-8 sm:p-10 md:order-1 md:flex md:w-1/2 lg:p-16"
            >
              <h1
                ref="title"
                class="text-2xl font-bold text-gray-900 lg:text-4xl"
              >
                {{ recipe.title }}
              </h1>
              <GeneralInformation v-if="data?.recipe" :recipe="data.recipe" />
            </div>
            <div class="order-1 h-full w-full md:order-2 md:w-1/2">
              <NuxtImg
                class="h-full w-full object-cover"
                :src="`${backendUrl}/images/recipes/${recipe.assets[0]?.image}`"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
