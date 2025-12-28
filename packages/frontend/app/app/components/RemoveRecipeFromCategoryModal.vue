<script setup lang="ts">
import { graphql, useFragment, type FragmentType } from '~/gql';
import { RecipeFragment } from './RecipesList/Item.vue';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const props = defineProps<{
  category: FragmentType<typeof CategoryFieldsFragment>;
  recipe: FragmentType<typeof RecipeFragment>;
}>();

const emits = defineEmits<{
  (e: 'done', category: any): void;
  (e: 'close'): void;
}>();

const inputValue = defineModel<boolean>({ required: true });
const recipe = useFragment(RecipeFragment, props.recipe);
const category = useFragment(CategoryFieldsFragment, props.category);

const { executeMutation, fetching } = useMutation(
  graphql(`
    mutation removeRecipeFromCategory($id: Int!, $recipeId: Int!) {
      removeRecipeFromCategory(id: $id, recipeId: $recipeId) {
        ...CategoryDetailFields
      }
    }
  `)
);

async function deleteRecipeFromCategory() {
  const response = await executeMutation({
    id: category.id,
    recipeId: recipe.id
  });

  if (response.data?.removeRecipeFromCategory)
    emits('done', response.data?.removeRecipeFromCategory);
  else emits('close');

  inputValue.value = false;
}
</script>

<template>
  <Dialog v-model="inputValue" modal>
    <template #header>
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600" />
        <h3 class="ml-3 text-lg leading-6 font-medium text-gray-900">
          Rezept aus Kategorie löschen
        </h3>
      </div>
    </template>

    Wollen Sie das Rezept <b>'{{ recipe.title }}'</b> aus Kategorie
    <b>'{{ category.name }}'</b> löschen?

    <template #footer>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :loading="fetching"
        :disabled="fetching"
        @click="deleteRecipeFromCategory"
      >
        Löschen
      </CustomButton>
      <CustomButton
        intent="secondary"
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="fetching"
        @click="inputValue = false"
      >
        Abbrechen
      </CustomButton>
    </template>
  </Dialog>
</template>
