<script lang="ts" setup>
import { RecipeFragment } from './Item.vue';
import { makeFragmentData, useFragment, type FragmentType } from '~/gql';
import type { RouteParams } from 'vue-router';

const props = withDefaults(
  defineProps<{
    recipes: FragmentType<typeof RecipeFragment>[];
    detailRouteName?: string;
    detailRouteParams?: RouteParams;
  }>(),
  {
    recipes: () => [],
    detailRouteName: undefined,
    detailRouteParams: undefined
  }
);
defineEmits<{
  (e: 'delete', recipe: FragmentType<typeof RecipeFragment>): void;
}>();

const recipesArray = useFragment(RecipeFragment, props.recipes);
</script>

<template>
  <transition-group
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-0 translate-x-0"
    enter-active-class="transition-all duration-300"
    leave-from-class="opacity-0 translate-x-0"
    leave-to-class="opacity-0 -translate-x-full"
    leave-active-class="transition-all duration-300"
  >
    <div v-for="r in recipesArray" :key="r.id">
      <RecipesListItem
        :recipe="makeFragmentData(r, RecipeFragment)"
        :detail-route-name="detailRouteName"
        :detail-route-params="detailRouteParams"
        @delete="$emit('delete', $event)"
      />
    </div>
  </transition-group>
</template>
