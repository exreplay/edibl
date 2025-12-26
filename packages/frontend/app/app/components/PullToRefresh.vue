<script lang="ts" setup>
const props = defineProps<{
  refresh: () => Promise<void>;
  refreshing?: boolean;
}>();

const el = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const pullToRefresh = ref<HTMLDivElement>();
const isRefreshing = ref(false);

const { y } = useWindowScroll();

const { distanceY, isSwiping } = usePointerSwipe(el, {
  threshold: 10,
  onSwipe: () => {
    if (!content.value || !pullToRefresh.value || y.value > 0) return;

    let distance = distanceY.value * -1;
    const distanceDiff = distance - pullToRefresh.value.clientHeight;

    if (distanceDiff > 0) {
      distance = pullToRefresh.value.clientHeight + distanceDiff * 0.2;
    }

    if (distance > 0)
      content.value.style.transform = `translateY(${distance}px)`;
    else content.value.style.transform = `translateY(0px)`;
  },
  onSwipeEnd: async () => {
    const distance = distanceY.value * -1;

    if (!content.value || !pullToRefresh.value || y.value > 0) return;

    if (distance < pullToRefresh.value.clientHeight) {
      content.value.style.transform = '';
      return;
    }

    isRefreshing.value = true;
    content.value.style.transform = `translateY(${pullToRefresh.value.clientHeight}px)`;
    await props.refresh();
    content.value.style.transform = '';
    isRefreshing.value = false;
  }
});

let refreshingResolver: Promise<void>;

watch(
  () => props.refreshing,
  async () => {
    if (!content.value || !pullToRefresh.value) return;

    if (props.refreshing) {
      isRefreshing.value = true;
      content.value.style.transform = `translateY(${pullToRefresh.value.clientHeight}px)`;
      refreshingResolver = new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      await refreshingResolver;
      content.value.style.transform = '';
      isRefreshing.value = false;
    }
  }
);
</script>

<template>
  <div ref="el" :class="['relative', y > 0 && '!touch-auto']">
    <div
      ref="pullToRefresh"
      class="absolute left-0 top-0 z-0 flex w-full items-center justify-center p-4 text-white"
    >
      <Spinner class="text-black" :spin="isRefreshing" />
    </div>
    <div
      ref="content"
      :class="[!isSwiping && 'transition-all', 'relative z-10 bg-white']"
    >
      <slot />
    </div>
  </div>
</template>
