<script lang="ts" setup>
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { graphql, useFragment } from '~/gql';
import { CategoryFieldsFragment } from '~/pages/categories/index/[categoryId]/index.vue';

const selectedCategory = ref<string>();
const props = defineProps<{
  modelValue: boolean;
  recipe: any | null;
}>();
const emits = defineEmits<(e: 'update:modelValue') => void>();

const inputValue = useVModel(props, 'modelValue', emits);

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

const categories = useFragment(CategoryFieldsFragment, data.value?.categories);

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
  <Modal v-model="inputValue">
    <template #title> Kategorie wählen </template>
    <RadioGroup v-if="categories" v-model="selectedCategory">
      <RadioGroupOption
        v-for="category in categories || []"
        :key="category.id"
        v-slot="{ checked }"
        :value="category.id"
        class="my-4"
      >
        <div
          :class="[
            'flex cursor-pointer items-center rounded-xl p-4 text-gray-900 shadow-md transition-colors duration-150 hover:shadow-lg',
            checked ? 'bg-pink-200 hover:bg-pink-100' : 'hover:bg-gray-100'
          ]"
        >
          {{ category.name }}
          <CheckCircleIcon
            v-if="checked"
            class="ml-auto h-6 w-6 text-pink-400"
          />
        </div>
      </RadioGroupOption>
    </RadioGroup>

    <template #actions>
      <Button
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="pink"
        :disabled="fetching"
        :loading="fetching"
        @click="addRecipeToCategory"
      >
        Speichern
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
