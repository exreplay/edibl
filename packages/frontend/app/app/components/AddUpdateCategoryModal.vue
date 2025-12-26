<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const props = defineProps<{
  modelValue: boolean;
  category: FragmentType<typeof CategoryFieldsFragment> | null;
}>();
const emits = defineEmits<{
  (e: 'done', categories: FragmentType<typeof CategoryFieldsFragment>[]): void;
  (e: 'close'): void;
  (e: 'update:modelValue'): void;
}>();

const inputValue = useVModel(props, 'modelValue', emits);
const category = useFragment(CategoryFieldsFragment, props.category);
const name = ref('');

const addMutation = useMutation(
  graphql(/* GraphQL */ `
    mutation addCategory($name: String!) {
      addCategory(name: $name) {
        ...CategoryFields
      }
    }
  `)
);
const updateMutation = useMutation(
  graphql(/* GraphQL */ `
    mutation updateCategory($id: Int!, $name: String!) {
      updateCategory(id: $id, name: $name) {
        ...CategoryFields
      }
    }
  `)
);

const isEdit = computed(() => {
  return !!props.category;
});

watch(
  () => category,
  (val) => {
    name.value = val?.name || '';
  }
);

async function addCategory() {
  try {
    const response = await addMutation.executeMutation({
      name: name.value
    });

    emits('done', response?.data?.addCategory || []);
    inputValue.value = false;
  } catch (error) {
    console.log(error);
  }
}

async function updateCategory() {
  if (!category) return;

  try {
    const response = await updateMutation.executeMutation({
      id: category.id,
      name: name.value
    });

    emits('done', response?.data?.updateCategory || []);
    inputValue.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Modal v-model="inputValue">
    <template v-if="isEdit" #title>
      Kategorie '{{ category?.name }}'' bearbeiten
    </template>
    <template v-else #title> Kategorie erstellen </template>
    <TextField v-model="name" />
    <template #actions>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="pink"
        @click="isEdit ? updateCategory() : addCategory()"
      >
        Speichern
      </Button>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="gray"
        @click="inputValue = false"
      >
        Abbrechen
      </Button>
    </template>
  </Modal>
</template>
