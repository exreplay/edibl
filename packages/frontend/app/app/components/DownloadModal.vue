<script lang="ts" setup>
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
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
const selectedProvider = ref(Provider.Cookidoo);

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
  <Modal v-model="inputValue">
    <template #title>Rezept herunterladen</template>
    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700">
        URL
      </label>

      <div class="relative mt-1 rounded-md shadow-sm">
        <TextField v-model="url" :disabled="downloading" />
      </div>

      <Listbox v-model="selectedProvider" as="div" class="mt-4">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
          Provider
        </ListboxLabel>

        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
            <span class="flex items-center">
              <ProviderIcons :provider="Provider.Cookidoo" class="mr-3 h-5" />
              {{ Provider.Cookidoo }}
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="provider in Object.values(Provider)"
                :key="provider"
                v-slot="{ active, selected }"
                as="template"
                :value="provider"
              >
                <li
                  :class="[
                    active ? 'bg-pink-100 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                  ]"
                >
                  <div class="flex items-center">
                    <ProviderIcons
                      :provider="Provider.Cookidoo"
                      class="mr-3 h-5"
                    />
                    {{ Provider.Cookidoo }}
                  </div>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-pink-500',
                      'absolute inset-y-0 right-0 flex items-center pr-4'
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <template #actions>
      <Button
        :disabled="downloading"
        :loading="downloading"
        color="pink"
        class="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        @click="download"
      >
        <template v-if="downloading">Downloading</template>
        <template v-else>Download</template>
      </Button>
    </template>
  </Modal>
</template>
