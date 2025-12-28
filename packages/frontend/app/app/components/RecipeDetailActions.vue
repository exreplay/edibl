<script setup lang="ts">
import AddRecipeToCategory from './AddRecipeToCategory.vue';
import type { FragmentType } from '~/gql';
import type { RecipeDetailFieldsFragment } from './Recipe/Detail.vue';

// const { executeMutation } = useAddRecipeToShoppingListMutation();

const showAddRecipeToCategoryModal = ref(false);

const props = defineProps<{
  modelValue: boolean;
  recipe: FragmentType<typeof RecipeDetailFieldsFragment>;
}>();
const emits = defineEmits<(e: 'update:modelValue') => void>();

const showActions = useVModel(props, 'modelValue', emits);

const addToShoppingList = async () => {
  // await executeMutation({
  //   recipeId: parseInt(route.params.recipeId as string, 10)
  // });
  showActions.value = false;
};
</script>

<template>
  <AddRecipeToCategory
    v-model="showAddRecipeToCategoryModal"
    :recipe="recipe"
  />

  <ActionSheet v-model="showActions">
    <ActionSheetItem
      icon="ViewList"
      @click="showAddRecipeToCategoryModal = true"
    >
      <template #prepend>
        <i class="pi pi-bookmark"></i>
      </template>
      Zur Kategorie hinzufügen
    </ActionSheetItem>
    <ActionSheetItem icon="ViewList" @click="addToShoppingList">
      <template #prepend>
        <i class="pi pi-shopping-cart"></i>
      </template>
      Auf die Einkaufsliste
    </ActionSheetItem>
    <ActionSheetItem icon="Calendar">
      <template #prepend>
        <i class="pi pi-calendar"></i>
      </template>
      Zur Wochenplanung hinzufügen
    </ActionSheetItem>
  </ActionSheet>
</template>
