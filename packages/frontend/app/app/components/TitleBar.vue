<script lang="ts" setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';

const root = ref<HTMLDivElement | null>(null);
const route = useRoute();
const showTitleBarBg = ref(false);
const titleBarStore = useTitleBarStore();

const hide = computed(() => {
  return !!route.meta.hideTitleBar;
});

const scrollTrigger = computed(() => {
  return titleBarStore.scrollTrigger;
});

const scroll = () => {
  if (!hide.value && root.value) {
    const { height } = root.value.getBoundingClientRect();
    const top =
      scrollTrigger.value?.getBoundingClientRect().top ||
      window.scrollY * -1 + 50;

    if (top < height / 2) showTitleBarBg.value = true;
    else showTitleBarBg.value = false;
  }
};

const routeName = computed(() => {
  return (route.name as string) || '';
});

onMounted(() => {
  scroll();
  useEventListener(window, 'scroll', scroll);
});
</script>

<template>
  <div
    v-if="!hide"
    ref="root"
    :class="[
      'fixed left-0 top-0 z-40 w-full border-b border-transparent transition-all duration-200 standalone:pt-safe-area-top',
      showTitleBarBg && 'border-gray-100 bg-white/80 backdrop-blur-md'
    ]"
  >
    <div
      class="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center p-4 standalone:-mt-4 standalone:py-0 standalone:pl-safe-area-left standalone:pr-safe-area-right standalone:md:mt-0"
    >
      <ClientOnly>
        <div class="flex items-center">
          <transition
            mode="out-in"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            enter-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 "
            leave-active-class="transition-opacity duration-200"
          >
            <NuxtLinkLocale
              v-if="titleBarStore.back"
              :to="titleBarStore.back"
              class="relative z-10 flex items-center overflow-hidden"
            >
              <ChevronLeftIcon
                class="h-6 w-6 shrink-0 text-pink-500 drop-shadow-md"
              />
              <transition
                mode="out-in"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                enter-active-class="transition-all duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
                leave-active-class="transition-all duration-200"
              >
                <span
                  :key="routeName"
                  class="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-bold text-pink-500"
                >
                  {{ titleBarStore.backTo }}
                </span>
              </transition>
            </NuxtLinkLocale>
            <span v-else>
              <Logo class="my-1 mr-3 h-5 shrink-0" />
            </span>
          </transition>
        </div>
      </ClientOnly>

      <div class="overflow-hidden px-2 text-center">
        <transition
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          enter-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
          leave-active-class="transition-all duration-200"
        >
          <div v-if="showTitleBarBg">
            <transition
              mode="out-in"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              enter-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              leave-active-class="transition-opacity duration-200"
            >
              <span
                :key="routeName"
                class="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold"
              >
                {{ titleBarStore.title }}
              </span>
            </transition>
            <slot />
          </div>
        </transition>
      </div>
      <div class="flex justify-end">
        <transition
          mode="out-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="transition-opacity duration-200"
        >
          <span :key="routeName" class="flex">
            <PortalTarget name="titleBarRight"></PortalTarget>
          </span>
        </transition>
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
