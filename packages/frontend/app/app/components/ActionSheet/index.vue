<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue';

const props = defineProps<{
  modelValue?: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:modelValue'): void;
}>();
const inputValue = useVModel(props, 'modelValue', emits);
const modalStore = useModalStore();

function closeModal() {
  inputValue.value = false;
}
</script>

<template>
  <TransitionRoot :show="inputValue" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
        as="template"
        enter="transition-opacity duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @before-enter="modalStore.actionSheetOpen = true"
        @after-leave="modalStore.actionSheetOpen = false"
      >
        <div
          class="fixed bottom-0 left-0 w-screen h-full z-40 bg-black/50"
        ></div>
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transition-transform duration-300"
        enter-from="translate-y-full"
        enter-to="translate-y-0"
        leave="transition-transform duration-300"
        leave-from="translate-y-0"
        leave-to="translate-y-full"
      >
        <DialogPanel class="fixed bottom-0 left-0 w-full z-40">
          <div
            class="rounded-t-lg bg-white py-5 max-w-md mx-auto pb-safe-area-bottom"
          >
            <ul class="mb-4">
              <slot />
            </ul>
            <div class="px-5">
              <Button class="w-full" @click="inputValue = false">
                Abbrechen
              </Button>
            </div>
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
