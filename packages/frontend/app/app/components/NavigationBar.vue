<script lang="ts" setup>
const route = useRoute();
const hide = computed(() => {
  return route.meta.hideNavigationBar;
});

const navigationBarRoutes = [
  {
    path: '/recipes',
    title: 'Rezepte',
    icon: 'pi-book'
  },
  {
    path: '/categories',
    title: 'Kategorien',
    icon: 'pi-bookmark'
  },
  {
    path: '/groceries',
    title: 'Einkaufen',
    icon: 'pi-shopping-cart'
  }
];
</script>

<template>
  <Transition
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    enter-active-class="transition-transform duration-200"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
    leave-active-class="transition-transform duration-200"
  >
    <div
      v-if="!hide"
      class="fixed bottom-0 left-0 z-30 w-full bg-white/80 backdrop-blur-md standalone:pb-safe-area-bottom"
    >
      <ul class="flex">
        <li
          v-for="(navBarRoute, key) in navigationBarRoutes"
          :key="key"
          class="w-full"
        >
          <NuxtLinkLocale
            :to="navBarRoute.path"
            class="flex flex-col items-center border-t-2 px-4 py-2 text-xs border-gray-200 text-gray-400"
            active-class="border-pink-500 text-pink-500"
          >
            <i :class="['text-base mt-1 mb-2 pi', navBarRoute.icon]" />
            {{ navBarRoute.title }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
  </Transition>
</template>
