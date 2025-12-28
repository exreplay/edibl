<script lang="ts" setup>
const visible = defineModel<boolean>();
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :closable="false"
    :show-header="false"
    position="bottom"
    :pt="{
      transition: {
        enterActiveClass: 'transition-transform duration-300',
        enterFromClass: 'translate-y-full',
        enterToClass: 'translate-y-0',
        leaveActiveClass: 'transition-transform duration-300',
        leaveFromClass: 'translate-y-0',
        leaveToClass: 'translate-y-full'
      },
      root: {
        class: 'bg-white rounded-t-lg'
      },
      content: {
        class: 'px-4 pt-4'
      }
    }"
  >
    <div class="max-w-md mx-auto">
      <ul>
        <slot />
      </ul>
    </div>

    <template #footer>
      <CustomButton class="w-full" label="Abbrechen" @click="visible = false" />
    </template>
  </Dialog>
</template>
