<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    narrower?: boolean;
    loading?: boolean;
    small?: boolean;
    color?: 'red' | 'indigo' | 'pink' | 'gray';
    type?: string;
    to?: RouteLocationRaw;
  }>(),
  {
    color: 'pink',
    type: 'button',
    to: undefined
  }
);
defineEmits(['click']);

const localeRoute = useLocaleRoute();

const spacing = computed(() => {
  if (props.small) {
    if (props.narrower) return 'px-2 py-1';
    return 'px-3 py-1';
  } else {
    if (props.narrower) return 'p-2';
    return 'px-4 py-2';
  }
});

const buttonColor = computed(() => {
  if (props.color === 'red')
    return 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
  else if (props.color === 'indigo')
    return 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
  else if (props.color === 'pink')
    return 'text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500';
  else
    return 'text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-pink-500';
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :type="type"
    :to="localeRoute(to)"
    :class="[
      'group relative flex items-center justify-center rounded-md border border-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
      spacing,
      buttonColor,
      disabled && 'cursor-not-allowed opacity-50'
    ]"
    :disabled="disabled"
    style="-webkit-appearance: none"
    @click="$emit('click')"
  >
    <Spinner v-if="loading" />
    <slot></slot>
  </component>
</template>
