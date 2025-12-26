<script lang="ts">
export const CategoryDetailFieldsFragment = graphql(/* GraphQL */ `
  fragment CategoryDetailFields on Category {
    id
    name
    recipes {
      ...RecipeFragment
    }
  }
`);

export const CategoryFieldsFragment = graphql(/* GraphQL */ `
  fragment CategoryFields on Category {
    id
    name
  }
`);
</script>

<script setup lang="ts">
import { graphql, useFragment } from '~/gql';

definePageMeta({
  middleware: ['auth']
});

const route = useRoute('categories-index-categoryId___de');
const deleteOpen = ref(false);
const recipeToDelete = ref<any | null>(null);
const categoryHeadline = ref<HTMLHeadingElement | null>(null);
const titleBarStore = useTitleBarStore();

if (!titleBarStore.backTo) titleBarStore.backTo = 'Kategorien';
titleBarStore.back = { name: 'categories-index' };

onMounted(() => {
  titleBarStore.scrollTrigger = categoryHeadline.value;
});

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query category($id: Int!) {
      category(id: $id) {
        ...CategoryDetailFields
      }
    }
  `),
  variables: {
    id: parseInt(route.params.categoryId as string, 10)
  }
});
const category = useFragment(
  CategoryDetailFieldsFragment,
  data.value?.category
);

titleBarStore.title = category?.name || null;
titleBarStore.backTo = 'Kategorien';
titleBarStore.back = { name: 'categories-index' };

function deleteRecipeFromCategory(recipe: any) {
  recipeToDelete.value = recipe;
  deleteOpen.value = true;
}
</script>

<template>
  <div class="px-4">
    <div class="container mx-auto pt-safe-area-top-nav">
      <h2 ref="categoryHeadline" class="text-3xl font-bold text-gray-900">
        {{ category?.name }}
      </h2>
      <RecipesList
        v-if="category?.recipes"
        :recipes="category.recipes"
        detail-route-name="categories-index-categoryId-recipe-recipeId"
        :detail-route-params="{ categoryId: category?.id?.toString() || '' }"
        @delete="deleteRecipeFromCategory"
      />
    </div>
    <RemoveRecipeFromCategoryModal
      v-model="deleteOpen"
      :category="category"
      :recipe="recipeToDelete"
      @close="recipeToDelete = null"
      @done="category = $event"
    />
  </div>
</template>
