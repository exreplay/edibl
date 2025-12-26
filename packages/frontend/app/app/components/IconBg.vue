<script lang="ts" setup>
withDefaults(
  defineProps<{
    dimensions?: string;
  }>(),
  {
    dimensions: 'h-8 w-8'
  }
);
</script>

<template>
  <div
    :class="[
      'shrink-0 flex items-center justify-center rounded-full',
      dimensions
    ]"
  >
    <slot />
  </div>
</template>
