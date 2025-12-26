<script lang="ts" setup>
const props = defineProps<{
  radius: number;
  progress: number;
  stroke: number;
}>();

const normalizedRadius = computed(() => {
  return props.radius - props.stroke * 2;
});
const circumference = computed(() => {
  return normalizedRadius.value * 2 * Math.PI;
});
const strokeDashoffset = ref(circumference.value);

const setStrokeDashoffset = () => {
  strokeDashoffset.value =
    circumference.value - (props.progress / 100) * circumference.value;
};

watch(() => props.progress, setStrokeDashoffset);

onMounted(() => {
  setTimeout(() => {
    setStrokeDashoffset();
  }, 1000);
});
</script>

<template>
  <div class="relative inline-block">
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        class="-rotate-90 origin-center transition-all duration-500 ease-in-out text-pink-500 opacity-[0.15]"
        stroke="currentColor"
        fill="transparent"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
      <circle
        class="-rotate-90 origin-center transition-all duration-500 ease-out text-pink-500"
        stroke="currentColor"
        fill="transparent"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
    <div
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>
