<script setup lang="ts">
import { graphql, useFragment, type FragmentType } from '~/gql';

const props = defineProps<{
  assets: FragmentType<typeof AssetFieldsFragment>[];
}>();
const assets = computed(() => useFragment(AssetFieldsFragment, props.assets));

const img = useImage();
const {
  public: { backendUrl }
} = useRuntimeConfig();

const headerBackground = computed(() => {
  const imgUrl = img(`${backendUrl}/images/recipes/${assets.value[0]?.image}`);
  return { backgroundImage: `url('${imgUrl}')` };
});
</script>

<script lang="ts">
export const AssetFieldsFragment = graphql(/* GraphQL `*/ `
  fragment AssetFields on Asset {
    id
    image
  }
`);
</script>

<template>
  <div
    class="sticky top-0 z-0 h-[40vh] w-full overflow-hidden bg-gray-100 md:h-50vh md:max-h-125 md:min-h-100 md:pt-16"
  >
    <div
      class="absolute left-0 top-0 z-0 hidden h-full w-full scale-110 bg-pink-50 bg-cover bg-center blur-3xl md:block"
      :style="headerBackground"
    ></div>
    <div class="relative z-10 h-full md:px-4">
      <div class="mx-auto flex h-full md:container">
        <div
          class="mx-auto flex h-full w-full max-w-5xl flex-wrap overflow-hidden bg-white md:rounded-3xl"
        >
          <div
            class="order-2 hidden w-full flex-col p-8 sm:p-10 md:order-1 md:flex md:w-1/2 lg:p-16"
          >
            <slot />
          </div>

          <div class="order-1 h-full w-full md:order-2 md:w-1/2">
            <NuxtImg
              class="h-full w-full object-cover"
              :src="`${backendUrl}/images/recipes/${assets[0]?.image}`"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
