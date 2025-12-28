<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const props = defineProps<{
  category: FragmentType<typeof CategoryFieldsFragment> | null;
}>();
const emits = defineEmits<{
  (e: 'done', categories: FragmentType<typeof CategoryFieldsFragment>[]): void;
  (e: 'close'): void;
}>();
const inputValue = defineModel<boolean>({ required: true });

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
  <Dialog v-model:visible="inputValue" modal>
    <template #header>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        <template v-if="isEdit">
          Kategorie '{{ category?.name }}'' bearbeiten
        </template>
        <template v-else> Kategorie erstellen </template>
      </h3>
    </template>

    <TextField v-model="name" />

    <template #footer>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        @click="isEdit ? updateCategory() : addCategory()"
      >
        Speichern
      </CustomButton>
      <CustomButton
        intent="secondary"
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        @click="inputValue = false"
      >
        Abbrechen
      </CustomButton>
    </template>
  </Dialog>
</template>
