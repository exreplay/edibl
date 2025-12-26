<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import { graphql } from '~/gql';

const props = defineProps<{
  modelValue: boolean;
  category?: any | null;
  recipe?: any | null;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue'): void;
  (e: 'done', category: any): void;
  (e: 'close'): void;
}>();
const inputValue = useVModel(props, 'modelValue', emits);
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
    id: props.category?.id || '',
    recipeId: props.recipe?.id || ''
  });

  if (response.data?.removeRecipeFromCategory)
    emits('done', response.data?.removeRecipeFromCategory);
  else emits('close');

  inputValue.value = false;
}
</script>

<template>
  <Modal v-model="inputValue">
    <template #icon>
      <IconBg
        dimensions="h-12 w-12 sm:h-10 sm:w-10"
        class="mx-auto bg-red-100 sm:mx-0"
      >
        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
      </IconBg>
    </template>

    <template #title> Rezept aus Kategorie löschen </template>

    Wollen Sie das Rezept <b>'{{ recipe?.title }}'</b> aus Kategorie
    <b>'{{ category?.name }}'</b> löschen?

    <template #actions>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="red"
        :loading="fetching"
        :disabled="fetching"
        @click="deleteRecipeFromCategory"
      >
        Löschen
      </Button>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="gray"
        :disabled="fetching"
        @click="inputValue = false"
      >
        Abbrechen
      </Button>
    </template>
  </Modal>
</template>
