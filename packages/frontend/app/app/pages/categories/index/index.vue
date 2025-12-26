<script lang="ts" setup>
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { graphql, useFragment, type FragmentType } from '~/gql';
import { CategoryFieldsFragment } from './[categoryId]/index.vue';

definePageMeta({
  middleware: ['auth']
});

const titleBarStore = useTitleBarStore();
titleBarStore.back = null;
titleBarStore.title = 'Kategorien';

const catToDelete = ref<FragmentType<typeof CategoryFieldsFragment> | null>(
  null
);
const catToUpdate = ref<FragmentType<typeof CategoryFieldsFragment> | null>(
  null
);
const showModal = ref(false);
const showDeleteModal = ref(false);

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

function addCategory() {
  catToUpdate.value = null;
  showModal.value = true;
}

function updateCategory(category: any) {
  catToUpdate.value = category;
  showModal.value = true;
}

function removeCategory(category: any) {
  catToDelete.value = category;
  showDeleteModal.value = true;
}
</script>

<template>
  <div class="px-4">
    <div class="container mx-auto pt-safe-area-top-nav">
      <Portal to="titleBarRight">
        <Button color="pink" small narrower @click="addCategory">
          <PlusIcon class="h-4 w-4 drop-shadow-md" />
        </Button>
      </Portal>
      <h2 ref="recipesListHeadline" class="text-3xl font-bold text-gray-900">
        Kategorien
      </h2>
      <template v-for="category in categories" :key="category.id">
        <VueSwipeActionsSwipeOut
          class="my-4 overflow-hidden rounded-xl shadow-md transition-colors duration-150 hover:bg-gray-100 hover:text-gray-500 hover:shadow-lg"
          style="transform: translateZ(0)"
        >
          <NuxtLink
            :to="`/categories/${category.id}`"
            class="flex cursor-pointer items-center"
          >
            <div class="p-4">{{ category.name }}</div>
          </NuxtLink>
          <template #right>
            <div
              class="swipeout-action group flex cursor-pointer items-center justify-center bg-gray-50 p-6"
              @click="updateCategory(category)"
            >
              <IconBg class="bg-gray-100 group-hover:shadow-md">
                <PencilIcon class="w-h4 h-4 text-gray-600" />
              </IconBg>
            </div>
            <div
              class="swipeout-action group flex cursor-pointer items-center justify-center bg-gray-50 p-6"
              @click="removeCategory(category)"
            >
              <IconBg class="bg-red-100 group-hover:shadow-md">
                <TrashIcon class="w-h4 h-4 text-red-600" />
              </IconBg>
            </div>
          </template>
        </VueSwipeActionsSwipeOut>
      </template>
      <RemoveCategoryModal
        v-if="catToDelete"
        v-model="showDeleteModal"
        :category="catToDelete"
        @done="categories = useFragment(CategoryFieldsFragment, $event)"
      />
      <AddUpdateCategoryModal
        v-model="showModal"
        :category="catToUpdate"
        @done="categories = useFragment(CategoryFieldsFragment, $event)"
      />
    </div>
  </div>
</template>
