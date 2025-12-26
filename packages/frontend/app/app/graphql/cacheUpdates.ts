import { type GraphCacheUpdaters } from './schema';

export const cacheUpdates: GraphCacheUpdaters = {
  Mutation: {
    // addCategory: (result, _, cache) => {
    //   cache.updateQuery<CategoriesQuery>(
    //     {
    //       query: CategoriesDocument
    //     },
    //     (data) => {
    //       if (data?.categories) {
    //         data.categories = result.addCategory as never;
    //       }
    //       return data;
    //     }
    //   );
    // },
    // removeCategory: (result, _, cache) => {
    //   cache.updateQuery<CategoriesQuery>(
    //     {
    //       query: CategoriesDocument
    //     },
    //     (data) => {
    //       if (data?.categories) {
    //         data.categories = result.removeCategory as never;
    //       }
    //       return data;
    //     }
    //   );
    // },
    // updateCategory: (result, _, cache) => {
    //   cache.updateQuery<CategoriesQuery>(
    //     {
    //       query: CategoriesDocument
    //     },
    //     (data) => {
    //       if (data?.categories) {
    //         data.categories = result.updateCategory as never;
    //       }
    //       return data;
    //     }
    //   );
    // },
    // addRecipeToCategory: (result, args, cache) => {
    //   cache.updateQuery<CategoryQuery, CategoryQueryVariables>(
    //     {
    //       query: CategoryDocument,
    //       variables: {
    //         id: args.id
    //       }
    //     },
    //     (data) => {
    //       if (data?.category) {
    //         data.category = result.addRecipeToCategory as never;
    //       }
    //       return data;
    //     }
    //   );
    // },
    // addRecipeToShoppingList: (result, _, cache) => {
    //   cache.updateQuery<ShoppingListQuery>(
    //     {
    //       query: ShoppingListDocument
    //     },
    //     (data) => {
    //       if (data?.shoppingList) {
    //         data.shoppingList = result.addRecipeToShoppingList as never;
    //       }
    //       return data;
    //     }
    //   );
    // },
    // incrementShoppingListRecipe: (result, args, cache) => {
    //   cache.updateQuery<ShoppingListQuery>(
    //     {
    //       query: ShoppingListDocument
    //     },
    //     (data) => {
    //       if (data?.shoppingList) {
    //         for (const val of data.shoppingList) {
    //           if (
    //             val.id === args.id &&
    //             typeof result.incrementShoppingListRecipe?.count === 'number'
    //           ) {
    //             val.count = result.incrementShoppingListRecipe.count;
    //           }
    //         }
    //       }
    //       return data;
    //     }
    //   );
    // },
    // decrementShoppingListRecipe: (result, args, cache) => {
    //   cache.updateQuery<ShoppingListQuery>(
    //     {
    //       query: ShoppingListDocument
    //     },
    //     (data) => {
    //       if (data?.shoppingList) {
    //         for (const recipe of data.shoppingList) {
    //           if (
    //             recipe.id === args.id &&
    //             typeof result.decrementShoppingListRecipe?.count === 'number'
    //           ) {
    //             recipe.count = result.decrementShoppingListRecipe.count;
    //           }
    //         }
    //       }
    //       return data;
    //     }
    //   );
    // },
    // removeRecipeFromShoppingList: (_, args, cache) => {
    //   cache.updateQuery<ShoppingListQuery>(
    //     {
    //       query: ShoppingListDocument
    //     },
    //     (data) => {
    //       if (data?.shoppingList) {
    //         data.shoppingList = data.shoppingList.filter((recipe) => {
    //           return args.id !== recipe.id;
    //         });
    //       }
    //       return data;
    //     }
    //   );
    // },
    // scrape: (result, _, cache) => {
    //   cache.updateQuery<HomeRecipesQuery>(
    //     {
    //       query: HomeRecipesDocument
    //     },
    //     (data) => {
    //       if (data?.recipes) {
    //         data.recipes.push(result.scrape as HomeRecipesListFieldsFragment);
    //         // Sort the result the same way as the server
    //         data.recipes = data.recipes.sort((a, b) => {
    //           if (a.title < b.title) return -1;
    //           if (a.title > b.title) return 1;
    //           return 0;
    //         });
    //       }
    //       return data;
    //     }
    //   );
    // }
  }
};
