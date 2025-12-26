<script lang="ts" setup>
import type { BaseTransitionProps } from 'vue';

withDefaults(
  defineProps<{
    mode?: BaseTransitionProps['mode'];
  }>(),
  {
    mode: 'default'
  }
);

const route = useRoute();
const router = useRouter();
const transitionName = ref<'slide-left' | 'slide-right' | 'none'>('none');
const scrollPositions = ref({} as Record<string, number>);

const enterClass = computed(() => {
  if (transitionName.value === 'slide-left') return 'translate-x-full';
  else if (transitionName.value === 'slide-right') return '-translate-x-1/2';
  else return '';
});

const enterActiveClass = computed(() => {
  if (transitionName.value === 'slide-left')
    return 'fixed z-10 top-0 left-0 w-full h-screen transition-transform duration-500 shadow-lg';
  else if (transitionName.value === 'slide-right')
    return 'fixed z-0 top-0 left-0 w-full h-screen transition-transform duration-500';
  else return '';
});

const leaveOrEnterToClass = computed(() => {
  if (transitionName.value === 'none') return '';
  else return 'translate-x-0';
});

const leaveToClass = computed(() => {
  if (transitionName.value === 'slide-left') return '-translate-x-1/2';
  else if (transitionName.value === 'slide-right') return 'translate-x-full';
  else return '';
});

const leaveActiveClass = computed(() => {
  if (transitionName.value === 'slide-left')
    return 'fixed z-0 top-0 left-0 w-full h-screen transition-transform duration-500';
  else if (transitionName.value === 'slide-right')
    return 'fixed z-10 top-0 left-0 w-full h-screen transition-transform duration-500 shadow-lg';
  else return '';
});

const removeBeforeEach = router.beforeEach((to, from) => {
  scrollPositions.value[from.name as string] = window.scrollY;
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;

  if (to.matched[0].name !== from.matched[0].name) {
    transitionName.value = 'none';
  } else {
    transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }

  transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

onBeforeUnmount(() => {
  removeBeforeEach();
});

const beforeEnter: BaseTransitionProps['onBeforeEnter'] = (el) => {
  if (transitionName.value === 'slide-right') {
    nextTick()
      .then(() => {
        document.body.style.height = `${
          scrollPositions.value[route.name as string] + window.innerHeight
        }px`;
        window.scrollTo(0, scrollPositions.value[route.name as string]);
        el.style.top = `-${scrollPositions.value[route.name as string]}px`;
      })
      .catch((error) => console.log(error));
  }
};

const afterEnter: BaseTransitionProps['onAfterEnter'] = (el) => {
  if (transitionName.value === 'slide-right') {
    document.body.style.height = '';
    el.style.top = '';
    window.scrollTo(0, scrollPositions.value[route.name as string]);
  } else {
    window.scrollTo(0, 0);
  }
};

const beforeLeave: BaseTransitionProps['onBeforeLeave'] = (el) => {
  el.style.top = `-${window.scrollY}px`;
};
</script>

<template>
  <NuxtPage
    :transition="{
      appear: false,
      enterFromClass: enterClass,
      enterToClass: leaveOrEnterToClass,
      enterActiveClass: enterActiveClass,
      leaveFromClass: leaveOrEnterToClass,
      leaveToClass: leaveToClass,
      leaveActiveClass: leaveActiveClass,
      onBeforeEnter: beforeEnter,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave
    }"
  />
</template>
