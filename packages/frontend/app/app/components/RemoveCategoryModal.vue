<script lang="ts" setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
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
  <Modal v-model="inputValue">
    <template #icon>
      <IconBg
        dimensions="h-12 w-12 sm:h-10 sm:w-10"
        class="mx-auto bg-red-100 sm:mx-0"
      >
        <ExclamationCircleIcon class="h-6 w-6 text-red-600" />
      </IconBg>
    </template>

    <template #title>Kategorie "{{ category?.name }}" löschen</template>

    Wollen Sie die Kategorie wirklich löschen?

    <template #actions>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="fetching"
        :loading="fetching"
        color="red"
        @click="remove"
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
