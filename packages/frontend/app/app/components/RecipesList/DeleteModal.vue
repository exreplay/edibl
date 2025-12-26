<script lang="ts" setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { RecipeFragment } from './Item.vue';
import { graphql, useFragment, type FragmentType } from '~/gql';

const props = defineProps<{
  recipe: FragmentType<typeof RecipeFragment>;
  modelValue?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue'): void;
}>();

const inputValue = useVModel(props, 'modelValue', emit);
const isDeleting = ref(false);
const { executeMutation } = useMutation(
  graphql(/* GraphQL */ `
    mutation removeRecipe($id: Int!) {
      removeRecipe(id: $id) {
        ...RecipeFragment
      }
    }
  `)
);

const recipeObj = useFragment(RecipeFragment, props.recipe);

const remove = async () => {
  isDeleting.value = true;

  try {
    await executeMutation({
      id: recipeObj.id
    });

    inputValue.value = false;
  } finally {
    isDeleting.value = false;
  }
};
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

    <template #title>Rezept "{{ recipeObj.title }}" löschen</template>

    Wollen Sie das Rezept wirklich löschen?

    <template #actions>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="isDeleting"
        :loading="isDeleting"
        color="red"
        @click="remove"
      >
        Löschen
      </Button>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="gray"
        :disabled="isDeleting"
        @click="inputValue = false"
      >
        Abbrechen
      </Button>
    </template>
  </Modal>
</template>
