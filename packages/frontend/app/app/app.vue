<script lang="ts" setup>
const route = useRoute();

const hideNavigationBar = ref<boolean>(!!route.meta.hideNavigationBar);
const modalStore = useModalStore();

watch(route, async () => {
  await nextTick();
  hideNavigationBar.value = !!route.meta.hideNavigationBar;
});
</script>

<template>
  <Html lang="de" class="font-sans antialiased">
    <HtmlMeta />
    <Body
      :class="
        !modalStore.open && !modalStore.actionSheetOpen
          ? 'overflow-y-scroll'
          : ''
      "
    />
  </Html>

  <NuxtLoadingIndicator color="" class="bg-pink-600" />
  <UrqlWrapper>
    <TitleBar />
    <div :class="[!hideNavigationBar && 'pb-16 standalone:pb-24']">
      <NuxtPage />
    </div>
    <NavigationBar />
  </UrqlWrapper>
</template>
