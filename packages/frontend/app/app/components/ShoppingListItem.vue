<script lang="ts" setup>
import { graphql, useFragment, type FragmentType } from '~/gql';
import { RecipeIngredientsFieldsFragment } from './RecipeIngredientGroups/RecipeIngredient.vue';

const props = defineProps<{
  item: FragmentType<typeof ShoppingListFieldsFragment>;
}>();
const runtime = useRuntimeConfig();
const shoppingListItem = useFragment(ShoppingListFieldsFragment, props.item);

const ingredients = computed(() => {
  return (
    shoppingListItem.shoppingListIngredients.map((shoppingListIngredient) => {
      const ingredient = useFragment(
        RecipeIngredientsFieldsFragment,
        shoppingListIngredient.ingredient
      );

      const tmp = {
        ...ingredient,
        quantity: { ...ingredient.quantity }
      };

      if (tmp.quantity.value) tmp.quantity.value *= shoppingListItem.count;
      if (tmp.quantity.from) tmp.quantity.from *= shoppingListItem.count;
      if (tmp.quantity.to) tmp.quantity.to *= shoppingListItem.count;
      return tmp;
    }) || []
  );
});

const removeRecipeFromShoppingList = useMutation(
  graphql(/* GraphQL */ `
    mutation removeRecipeFromShoppingList($id: Int!) {
      removeRecipeFromShoppingList(id: $id) {
        id
        count
      }
    }
  `)
);
const decrementShoppingListRecipe = useMutation(
  graphql(/* GraphQL */ `
    mutation decrementShoppingListRecipe($id: Int!) {
      decrementShoppingListRecipe(id: $id) {
        id
        count
      }
    }
  `)
);
const incrementShoppingListRecipe = useMutation(
  graphql(/* GraphQL */ `
    mutation incrementShoppingListRecipe($id: Int!) {
      incrementShoppingListRecipe(id: $id) {
        id
        count
      }
    }
  `)
);

const remove = async () => {
  await removeRecipeFromShoppingList.executeMutation({
    id: shoppingListItem.id
  });
};

const decrement = async () => {
  await decrementShoppingListRecipe.executeMutation({
    id: shoppingListItem.id
  });
};

const increment = async () => {
  await incrementShoppingListRecipe.executeMutation({
    id: shoppingListItem.id
  });
};
</script>

<script lang="ts">
export const ShoppingListFieldsFragment = graphql(/* GraphQL */ `
  fragment ShoppingListFields on ShoppingList {
    id
    count
    shoppingListIngredients {
      id
      ingredient {
        ...RecipeIngredientsFields
      }
    }
    recipe {
      id
      title
      assets {
        id
        image
      }
    }
  }
`);
</script>

<template>
  <VueSwipeOut
    class="my-4 overflow-hidden rounded-xl shadow-md transition-colors duration-150 hover:shadow-lg"
    style="transform: translateZ(0)"
  >
    <div class="flex items-center border-b border-gray-200">
      <div class="relative w-32 shrink-0 self-stretch">
        <img
          :src="`${runtime.public.RECIPES_API_URL}/images/recipes/${shoppingListItem.recipe.assets[0].image}`"
          class="lazyImage absolute left-0 top-0 h-full w-full border-0 object-cover"
        />
      </div>
      <div class="flex w-full flex-col p-4">
        <div class="prose">
          <h4>
            {{ shoppingListItem.count }}x {{ shoppingListItem.recipe.title }}
          </h4>
        </div>
        <div class="mt-2 flex">
          <CustomButton
            size="small"
            icon="pi pi-minus"
            class="mr-1"
            :disabled="
              decrementShoppingListRecipe.fetching.value ||
              incrementShoppingListRecipe.fetching.value
            "
            @click="decrement"
          />
          <CustomButton
            size="small"
            icon="pi pi-plus"
            :disabled="
              decrementShoppingListRecipe.fetching.value ||
              incrementShoppingListRecipe.fetching.value
            "
            @click="increment"
          />
        </div>
      </div>
    </div>

    <RecipeIngredients class="p-4" :recipe-ingredients="ingredients" />

    <template #right>
      <div
        class="swipeout-action flex items-center justify-center bg-gray-50 p-6"
      >
        <IconBg class="bg-red-100" @click="remove">
          <i class="pi pi-trash text-red-600" />
        </IconBg>
      </div>
    </template>
  </VueSwipeOut>
</template>
