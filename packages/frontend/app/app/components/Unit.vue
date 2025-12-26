<script lang="ts" setup>
import type { Unit } from '~/gql/graphql';

defineProps<{
  unit: Unit;
}>();
const { t } = useI18n();
</script>

<template>
  <span>
    {{ t(unit) }}
  </span>
</template>

<i18n lang="json">
{
  "de": {
    "MILLIGRAM": "mg",
    "GRAM": "g",
    "KILOGRAM": "kg",
    "MILLILITER": "ml",
    "LITER": "l",
    "TEASPOON": "TL",
    "HEAPED_TEASPOON": "geh. TL",
    "LEVEL_TEASPOON": "gestr. TL",
    "TABLESPOON": "EL",
    "HEAPED_TABLESPOON": "geh. EL",
    "CUP": "Tasse",
    "PIECE": "Stück",
    "PIECES": "Stücke",
    "STEM": "Stängel",
    "BUNCH": "Bund",
    "CAN": "Dose",
    "PACKAGE": "Packung",
    "PORTION": "Portion",
    "PORTIONS": "Portionen",
    "PINCH": "Prise",
    "PINCHES": "Prisen",
    "KILOJOULE": "kJ",
    "KILOCALORIE": "kcal"
  }
}
</i18n>
