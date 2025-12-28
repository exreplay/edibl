<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
}>();
const value = defineModel<string | null>({ default: null });
</script>

<template>
  <InputText
    v-model="value"
    class="shadow-sm focus:ring-pink-500 focus:border-pink-500 focus:outline-none block w-full px-4 py-2 border border-gray-300 rounded-md text-base"
    :disabled="disabled"
  />
</template>
