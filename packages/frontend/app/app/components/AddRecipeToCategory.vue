<script lang="ts" setup>
import { graphql, useFragment } from '~/gql';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const selectedCategory = ref<string>();
const props = defineProps<{
  recipe: any | null;
}>();

const inputValue = defineModel<boolean>({ required: true });

const { executeMutation, fetching } = useMutation(
  graphql(/* GraphQL */ `
    mutation addRecipeToCategory($id: Int!, $recipeId: Int!) {
      addRecipeToCategory(id: $id, recipeId: $recipeId) {
        ...CategoryDetailFields
      }
    }
  `)
);

const { data } = await useQuery({
  query: graphql(/* GraphQL */ `
    query categories {
      categories {
        ...CategoryFields
      }
    }
  `),
  variables: {}
});

const categories = computed(
  () => useFragment(CategoryFieldsFragment, data.value?.categories) ?? undefined
);

async function addRecipeToCategory() {
  if (props.recipe && selectedCategory.value) {
    await executeMutation({
      id: parseInt(selectedCategory.value, 10),
      recipeId: props.recipe.id
    });

    inputValue.value = false;
  }
}
</script>

<template>
  <Dialog v-model:visible="inputValue" modal>
    <template #header>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Kategorie wählen
      </h3>
    </template>

    <Listbox
      v-model="selectedCategory"
      :options="categories"
      multiple
      aria-labelledby="multiple"
      :pt="{
        option(config) {
          return {
            class: [
              'flex cursor-pointer items-center rounded-xl p-4 text-gray-900 shadow-md transition-colors duration-150 hover:shadow-lg',
              config.context.selected
                ? 'bg-pink-200 hover:bg-pink-100'
                : 'hover:bg-gray-100'
            ].join(' ')
          };
        }
      }"
    >
      <template #option="slotProps">
        {{ slotProps.option.name }}
        <i
          v-if="slotProps.selected"
          class="pi pi-check-circle ml-auto text-pink-400"
        />
      </template>
    </Listbox>

    <template #footer>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        :disabled="fetching"
        :loading="fetching"
        @click="addRecipeToCategory"
      >
        Speichern
      </CustomButton>
      <CustomButton
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        intent="secondary"
        :disabled="fetching"
        @click="inputValue = false"
      >
        Abbrechen
      </CustomButton>
    </template>
  </Dialog>
</template>
