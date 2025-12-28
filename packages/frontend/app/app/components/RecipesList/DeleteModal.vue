<script lang="ts" setup>
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

const recipe = useFragment(RecipeFragment, props.recipe);

const remove = async () => {
  isDeleting.value = true;

  try {
    await executeMutation({
      id: recipe.id
    });

    inputValue.value = false;
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <Dialog v-model:visible="inputValue" modal>
    <template #header>
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600" />
        <h3 class="ml-3 text-lg leading-6 font-medium text-gray-900">
          Rezept "{{ recipe.title }}" löschen
        </h3>
      </div>
    </template>

    Wollen Sie das Rezept wirklich löschen?

    <template #footer>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="isDeleting"
        :loading="isDeleting"
        color="red"
        @click="remove"
      >
        Löschen
      </CustomButton>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="gray"
        :disabled="isDeleting"
        @click="inputValue = false"
      >
        Abbrechen
      </CustomButton>
    </template>
  </Dialog>
</template>
