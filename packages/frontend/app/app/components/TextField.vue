<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string | number;
  disabled?: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue'): void;
}>();

const inputValue = useVModel(props, 'modelValue', emits);
</script>

<template>
  <input
    id="price"
    v-model="inputValue"
    type="text"
    name="price"
    class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full px-4 py-2 border border-gray-300 rounded-md text-base"
    :disabled="disabled"
  />
</template>
