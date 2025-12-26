<script lang="ts" setup>
import type { NutritionType } from '~/gql/graphql';

defineProps<{
  type: NutritionType;
}>();
const { t } = useI18n();
</script>

<template>
  <span>
    {{ t(type) }}
  </span>
</template>

<i18n lang="json">
{
  "de": {
    "KILOJOULE": "Kilojoule",
    "KILOCALORIE": "Kilokalorie",
    "PROTEIN": "Eiweiß",
    "CARBOHYDRATE": "Kohlenhydrate",
    "FAT": "Fett",
    "SATURATED_FAT": "Gesättigte Fettsäuren",
    "DIETARY_FIBER": "Ballaststoffe",
    "SODIUM": "Natrium"
  }
}
</i18n>
