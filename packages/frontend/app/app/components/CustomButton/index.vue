<script lang="ts" setup>
import { buttonStyles, type ButtonProps } from './buttonStyles';

defineProps<{
  intent?: ButtonProps['intent'];
  disabled?: ButtonProps['disabled'];
  size?: ButtonProps['size'];
  asChild?: boolean;
}>();
</script>

<template>
  <Button
    v-slot="slotProps"
    :pt="{
      root: {
        class: buttonStyles({
          disabled,
          intent,
          size
        })
      },
      loadingIcon: {
        class: 'pi-spin mr-2'
      }
    }"
    :disabled="disabled ?? undefined"
    :as-child="asChild"
  >
    <slot
      :class="
        buttonStyles({
          disabled,
          intent,
          size
        })
      "
      :a11y-attrs="slotProps.a11yAttrs"
    />
  </Button>
</template>
