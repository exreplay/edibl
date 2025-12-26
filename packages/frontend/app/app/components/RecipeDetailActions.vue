<script setup lang="ts">
import {
  ViewColumnsIcon,
  CalendarIcon,
  BookmarkIcon
} from '@heroicons/vue/24/outline';
import AddRecipeToCategory from './AddRecipeToCategory.vue';

// const { executeMutation } = useAddRecipeToShoppingListMutation();

const route = useRoute();
const showAddRecipeToCategoryModal = ref(false);

const props = defineProps<{
  modelValue: boolean;
  recipe: any;
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
        <BookmarkIcon class="h-6 w-6" />
      </template>
      Zur Kategorie hinzufügen
    </ActionSheetItem>
    <ActionSheetItem icon="ViewList" @click="addToShoppingList">
      <template #prepend>
        <ViewColumnsIcon class="h-6 w-6" />
      </template>
      Auf die Einkaufsliste
    </ActionSheetItem>
    <ActionSheetItem icon="Calendar">
      <template #prepend>
        <CalendarIcon class="h-6 w-6" />
      </template>
      Zur Wochenplanung hinzufügen
    </ActionSheetItem>
  </ActionSheet>
</template>
