<script lang="ts" setup>
const props = defineProps<{
  time: number;
}>();

const hours = computed(() => {
  return Math.floor(props.time / 3600);
});
const minutes = computed(() => {
  return Math.floor((props.time % 3600) / 60);
});
</script>

<template>
  <span class="whitespace-nowrap">
    <template v-if="hours > 0"> {{ hours }} Std. </template>
    <template v-if="minutes > 0"> {{ minutes }} Min </template>
  </span>
</template>
