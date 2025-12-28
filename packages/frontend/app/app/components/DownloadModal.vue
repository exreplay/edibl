<script lang="ts" setup>
import { graphql, useFragment } from '~/gql';
import { Provider } from '~/gql/graphql';
import { RecipeFragment } from './RecipesList/Item.vue';

const props = defineProps<{
  modelValue?: boolean;
}>();
const emits = defineEmits<(e: 'update:modelValue') => void>();

const inputValue = useVModel(props, 'modelValue', emits);
const url = ref('');
const downloading = ref(false);
const selectedProvider = ref();

const providers = ref([
  {
    name: Provider.Cookidoo
  }
]);

const { executeMutation } = useMutation(
  graphql(/* GraphQL */ `
    mutation scrape($url: String!, $provider: Provider!) {
      scrape(url: $url, provider: $provider) {
        ...RecipeFragment
      }
    }
  `)
);

const download = async () => {
  if (!url.value) return;
  downloading.value = true;

  try {
    const response = await executeMutation({
      url: url.value,
      provider: selectedProvider.value
    });

    if (response.error) {
      console.error(response.error);
      return;
    }

    inputValue.value = false;
    url.value = '';

    const recipe = useFragment(RecipeFragment, response?.data?.scrape);

    if (recipe) {
      await navigateTo({
        path: '/recipes/:recipeId()',
        query: { recipeId: recipe.id }
      });
    }
  } finally {
    downloading.value = false;
  }
};
</script>

<template>
  <Dialog v-model:visible="inputValue" modal>
    <template #header>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Rezept herunterladen
      </h3>
    </template>

    <div class="flex flex-col gap-4">
      <TextField v-model="url" placeholder="URL" :disabled="downloading" />

      <FloatLabel class="w-full">
        <label for="provider">Provider</label>
        <Select
          v-model="selectedProvider"
          input_id="provider"
          :options="providers"
          :pt="{
            root: {
              class:
                'flex items-center relative w-full cursor-default rounded-md bg-white py-1.5 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'
            },
            dropdown: {
              class: 'ml-auto'
            },
            overlay: {
              class:
                'mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
            }
          }"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <ProviderIcons
                :provider="slotProps.value.name"
                class="mr-3 h-5"
              />
              {{ slotProps.value.name }}
            </div>
          </template>

          <template #option="slotProps">
            <div
              :class="[
                slotProps.selected ? 'bg-pink-100' : '',
                'flex items-center relative cursor-default select-none py-2 pl-3 pr-9'
              ]"
            >
              <ProviderIcons
                :provider="slotProps.option.name"
                class="mr-3 h-5"
              />
              {{ slotProps.option.name }}
            </div>
          </template>

          <template #dropdownicon>
            <i class="pi pi-chevron-down text-gray-400" />
          </template>
        </Select>
      </FloatLabel>
    </div>

    <template #footer>
      <CustomButton
        :disabled="downloading"
        :loading="downloading"
        :label="downloading ? 'Downloading' : 'Download'"
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        @click="download"
      />
    </template>
  </Dialog>
</template>
