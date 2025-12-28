<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const props = defineProps<{
  modelValue: boolean;
  category: FragmentType<typeof CategoryFieldsFragment>;
}>();
const emits = defineEmits<{
  (e: 'done', categories: FragmentType<typeof CategoryFieldsFragment>[]): void;
  (e: 'update:modelValue'): void;
}>();

const inputValue = useVModel(props, 'modelValue', emits);
const category = useFragment(CategoryFieldsFragment, props.category);

const { executeMutation, fetching } = useMutation(
  graphql(/* GraphQL */ `
    mutation removeCategory($id: Int!) {
      removeCategory(id: $id) {
        ...CategoryFields
      }
    }
  `)
);

async function remove() {
  if (!props.category) return;

  try {
    const response = await executeMutation({
      id: category.id
    });

    emits('done', response?.data?.removeCategory || []);
    inputValue.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Dialog v-model:visible="inputValue" modal>
    <template #header>
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600" />
        <h3 class="ml-3 text-lg leading-6 font-medium text-gray-900">
          Kategorie "{{ category?.name }}" löschen
        </h3>
      </div>
    </template>

    Wollen Sie die Kategorie wirklich löschen?

    <template #footer>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="fetching"
        :loading="fetching"
        @click="remove"
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
