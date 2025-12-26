/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation addRecipeToCategory($id: Int!, $recipeId: Int!) {\n      addRecipeToCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  ": typeof types.AddRecipeToCategoryDocument,
    "\n    query categories {\n      categories {\n        ...CategoryFields\n      }\n    }\n  ": typeof types.CategoriesDocument,
    "\n    mutation addCategory($name: String!) {\n      addCategory(name: $name) {\n        ...CategoryFields\n      }\n    }\n  ": typeof types.AddCategoryDocument,
    "\n    mutation updateCategory($id: Int!, $name: String!) {\n      updateCategory(id: $id, name: $name) {\n        ...CategoryFields\n      }\n    }\n  ": typeof types.UpdateCategoryDocument,
    "\n    mutation scrape($url: String!, $provider: Provider!) {\n      scrape(url: $url, provider: $provider) {\n        ...RecipeFragment\n      }\n    }\n  ": typeof types.ScrapeDocument,
    "\n  fragment RecipeDetailFields on Recipe {\n    id\n    title\n    difficulty\n    assets {\n      id\n      image\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n    additionalInformation {\n      id\n      content\n    }\n    servingSize {\n      id\n      quantity {\n        id\n        value\n      }\n      unit\n    }\n    nutritionGroups {\n      id\n      nutritions {\n        id\n        type\n        number\n        unit\n      }\n    }\n    ingredientGroups {\n      ...RecipeIngredientGroupFields\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n": typeof types.RecipeDetailFieldsFragmentDoc,
    "\n    query recipeDetail($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeDetailFields\n      }\n    }\n  ": typeof types.RecipeDetailDocument,
    "\n  fragment RecipeGuideFields on Recipe {\n    id\n    title\n    assets {\n      id\n      image\n    }\n    ingredientGroups {\n      id\n      title\n      ingredients {\n        ...RecipeIngredientsFields\n      }\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n": typeof types.RecipeGuideFieldsFragmentDoc,
    "\n  fragment RecipeIngredientsFields on Ingredient {\n    id\n    unit\n    name\n    notes\n    quantity {\n      id\n      from\n      to\n      value\n    }\n  }\n": typeof types.RecipeIngredientsFieldsFragmentDoc,
    "\n  fragment RecipeIngredientGroupFields on IngredientGroup {\n    id\n    title\n    ingredients {\n      ...RecipeIngredientsFields\n    }\n  }\n": typeof types.RecipeIngredientGroupFieldsFragmentDoc,
    "\n    mutation removeRecipe($id: Int!) {\n      removeRecipe(id: $id) {\n        ...RecipeFragment\n      }\n    }\n  ": typeof types.RemoveRecipeDocument,
    "\n  fragment RecipeFragment on Recipe {\n    id\n    title\n    provider\n    assets {\n      id\n      image\n    }\n    servingSize {\n      id\n      unit\n      quantity {\n        id\n        value\n      }\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n  }\n": typeof types.RecipeFragmentFragmentDoc,
    "\n    mutation removeCategory($id: Int!) {\n      removeCategory(id: $id) {\n        ...CategoryFields\n      }\n    }\n  ": typeof types.RemoveCategoryDocument,
    "\n    mutation removeRecipeFromCategory($id: Int!, $recipeId: Int!) {\n      removeRecipeFromCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  ": typeof types.RemoveRecipeFromCategoryDocument,
    "\n  fragment ShoppingListFields on ShoppingList {\n    id\n    count\n    shoppingListIngredients {\n      id\n      ingredient {\n        ...RecipeIngredientsFields\n      }\n    }\n    recipe {\n      id\n      title\n      assets {\n        id\n        image\n      }\n    }\n  }\n": typeof types.ShoppingListFieldsFragmentDoc,
    "\n    mutation removeRecipeFromShoppingList($id: Int!) {\n      removeRecipeFromShoppingList(id: $id) {\n        id\n        count\n      }\n    }\n  ": typeof types.RemoveRecipeFromShoppingListDocument,
    "\n    mutation decrementShoppingListRecipe($id: Int!) {\n      decrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  ": typeof types.DecrementShoppingListRecipeDocument,
    "\n    mutation incrementShoppingListRecipe($id: Int!) {\n      incrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  ": typeof types.IncrementShoppingListRecipeDocument,
    "\n  fragment CategoryDetailFields on Category {\n    id\n    name\n    recipes {\n      ...RecipeFragment\n    }\n  }\n": typeof types.CategoryDetailFieldsFragmentDoc,
    "\n  fragment CategoryFields on Category {\n    id\n    name\n  }\n": typeof types.CategoryFieldsFragmentDoc,
    "\n    query category($id: Int!) {\n      category(id: $id) {\n        ...CategoryDetailFields\n      }\n    }\n  ": typeof types.CategoryDocument,
    "\n    query recipeGuide($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeGuideFields\n      }\n    }\n  ": typeof types.RecipeGuideDocument,
    "\n    query getCategoryName($id: Int!) {\n      category(id: $id) {\n        name\n      }\n    }\n  ": typeof types.GetCategoryNameDocument,
    "\n    query shoppingList {\n      shoppingList {\n        ...ShoppingListFields\n      }\n    }\n  ": typeof types.ShoppingListDocument,
    "\n    mutation login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n      }\n    }\n  ": typeof types.LoginDocument,
    "\n    query HomeRecipes {\n      recipes {\n        ...RecipeFragment\n      }\n    }\n  ": typeof types.HomeRecipesDocument,
};
const documents: Documents = {
    "\n    mutation addRecipeToCategory($id: Int!, $recipeId: Int!) {\n      addRecipeToCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  ": types.AddRecipeToCategoryDocument,
    "\n    query categories {\n      categories {\n        ...CategoryFields\n      }\n    }\n  ": types.CategoriesDocument,
    "\n    mutation addCategory($name: String!) {\n      addCategory(name: $name) {\n        ...CategoryFields\n      }\n    }\n  ": types.AddCategoryDocument,
    "\n    mutation updateCategory($id: Int!, $name: String!) {\n      updateCategory(id: $id, name: $name) {\n        ...CategoryFields\n      }\n    }\n  ": types.UpdateCategoryDocument,
    "\n    mutation scrape($url: String!, $provider: Provider!) {\n      scrape(url: $url, provider: $provider) {\n        ...RecipeFragment\n      }\n    }\n  ": types.ScrapeDocument,
    "\n  fragment RecipeDetailFields on Recipe {\n    id\n    title\n    difficulty\n    assets {\n      id\n      image\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n    additionalInformation {\n      id\n      content\n    }\n    servingSize {\n      id\n      quantity {\n        id\n        value\n      }\n      unit\n    }\n    nutritionGroups {\n      id\n      nutritions {\n        id\n        type\n        number\n        unit\n      }\n    }\n    ingredientGroups {\n      ...RecipeIngredientGroupFields\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n": types.RecipeDetailFieldsFragmentDoc,
    "\n    query recipeDetail($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeDetailFields\n      }\n    }\n  ": types.RecipeDetailDocument,
    "\n  fragment RecipeGuideFields on Recipe {\n    id\n    title\n    assets {\n      id\n      image\n    }\n    ingredientGroups {\n      id\n      title\n      ingredients {\n        ...RecipeIngredientsFields\n      }\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n": types.RecipeGuideFieldsFragmentDoc,
    "\n  fragment RecipeIngredientsFields on Ingredient {\n    id\n    unit\n    name\n    notes\n    quantity {\n      id\n      from\n      to\n      value\n    }\n  }\n": types.RecipeIngredientsFieldsFragmentDoc,
    "\n  fragment RecipeIngredientGroupFields on IngredientGroup {\n    id\n    title\n    ingredients {\n      ...RecipeIngredientsFields\n    }\n  }\n": types.RecipeIngredientGroupFieldsFragmentDoc,
    "\n    mutation removeRecipe($id: Int!) {\n      removeRecipe(id: $id) {\n        ...RecipeFragment\n      }\n    }\n  ": types.RemoveRecipeDocument,
    "\n  fragment RecipeFragment on Recipe {\n    id\n    title\n    provider\n    assets {\n      id\n      image\n    }\n    servingSize {\n      id\n      unit\n      quantity {\n        id\n        value\n      }\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n  }\n": types.RecipeFragmentFragmentDoc,
    "\n    mutation removeCategory($id: Int!) {\n      removeCategory(id: $id) {\n        ...CategoryFields\n      }\n    }\n  ": types.RemoveCategoryDocument,
    "\n    mutation removeRecipeFromCategory($id: Int!, $recipeId: Int!) {\n      removeRecipeFromCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  ": types.RemoveRecipeFromCategoryDocument,
    "\n  fragment ShoppingListFields on ShoppingList {\n    id\n    count\n    shoppingListIngredients {\n      id\n      ingredient {\n        ...RecipeIngredientsFields\n      }\n    }\n    recipe {\n      id\n      title\n      assets {\n        id\n        image\n      }\n    }\n  }\n": types.ShoppingListFieldsFragmentDoc,
    "\n    mutation removeRecipeFromShoppingList($id: Int!) {\n      removeRecipeFromShoppingList(id: $id) {\n        id\n        count\n      }\n    }\n  ": types.RemoveRecipeFromShoppingListDocument,
    "\n    mutation decrementShoppingListRecipe($id: Int!) {\n      decrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  ": types.DecrementShoppingListRecipeDocument,
    "\n    mutation incrementShoppingListRecipe($id: Int!) {\n      incrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  ": types.IncrementShoppingListRecipeDocument,
    "\n  fragment CategoryDetailFields on Category {\n    id\n    name\n    recipes {\n      ...RecipeFragment\n    }\n  }\n": types.CategoryDetailFieldsFragmentDoc,
    "\n  fragment CategoryFields on Category {\n    id\n    name\n  }\n": types.CategoryFieldsFragmentDoc,
    "\n    query category($id: Int!) {\n      category(id: $id) {\n        ...CategoryDetailFields\n      }\n    }\n  ": types.CategoryDocument,
    "\n    query recipeGuide($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeGuideFields\n      }\n    }\n  ": types.RecipeGuideDocument,
    "\n    query getCategoryName($id: Int!) {\n      category(id: $id) {\n        name\n      }\n    }\n  ": types.GetCategoryNameDocument,
    "\n    query shoppingList {\n      shoppingList {\n        ...ShoppingListFields\n      }\n    }\n  ": types.ShoppingListDocument,
    "\n    mutation login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n      }\n    }\n  ": types.LoginDocument,
    "\n    query HomeRecipes {\n      recipes {\n        ...RecipeFragment\n      }\n    }\n  ": types.HomeRecipesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addRecipeToCategory($id: Int!, $recipeId: Int!) {\n      addRecipeToCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  "): (typeof documents)["\n    mutation addRecipeToCategory($id: Int!, $recipeId: Int!) {\n      addRecipeToCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query categories {\n      categories {\n        ...CategoryFields\n      }\n    }\n  "): (typeof documents)["\n    query categories {\n      categories {\n        ...CategoryFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addCategory($name: String!) {\n      addCategory(name: $name) {\n        ...CategoryFields\n      }\n    }\n  "): (typeof documents)["\n    mutation addCategory($name: String!) {\n      addCategory(name: $name) {\n        ...CategoryFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateCategory($id: Int!, $name: String!) {\n      updateCategory(id: $id, name: $name) {\n        ...CategoryFields\n      }\n    }\n  "): (typeof documents)["\n    mutation updateCategory($id: Int!, $name: String!) {\n      updateCategory(id: $id, name: $name) {\n        ...CategoryFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation scrape($url: String!, $provider: Provider!) {\n      scrape(url: $url, provider: $provider) {\n        ...RecipeFragment\n      }\n    }\n  "): (typeof documents)["\n    mutation scrape($url: String!, $provider: Provider!) {\n      scrape(url: $url, provider: $provider) {\n        ...RecipeFragment\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeDetailFields on Recipe {\n    id\n    title\n    difficulty\n    assets {\n      id\n      image\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n    additionalInformation {\n      id\n      content\n    }\n    servingSize {\n      id\n      quantity {\n        id\n        value\n      }\n      unit\n    }\n    nutritionGroups {\n      id\n      nutritions {\n        id\n        type\n        number\n        unit\n      }\n    }\n    ingredientGroups {\n      ...RecipeIngredientGroupFields\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeDetailFields on Recipe {\n    id\n    title\n    difficulty\n    assets {\n      id\n      image\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n    additionalInformation {\n      id\n      content\n    }\n    servingSize {\n      id\n      quantity {\n        id\n        value\n      }\n      unit\n    }\n    nutritionGroups {\n      id\n      nutritions {\n        id\n        type\n        number\n        unit\n      }\n    }\n    ingredientGroups {\n      ...RecipeIngredientGroupFields\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query recipeDetail($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeDetailFields\n      }\n    }\n  "): (typeof documents)["\n    query recipeDetail($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeDetailFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeGuideFields on Recipe {\n    id\n    title\n    assets {\n      id\n      image\n    }\n    ingredientGroups {\n      id\n      title\n      ingredients {\n        ...RecipeIngredientsFields\n      }\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeGuideFields on Recipe {\n    id\n    title\n    assets {\n      id\n      image\n    }\n    ingredientGroups {\n      id\n      title\n      ingredients {\n        ...RecipeIngredientsFields\n      }\n    }\n    stepGroups {\n      id\n      title\n      steps {\n        id\n        title\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeIngredientsFields on Ingredient {\n    id\n    unit\n    name\n    notes\n    quantity {\n      id\n      from\n      to\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeIngredientsFields on Ingredient {\n    id\n    unit\n    name\n    notes\n    quantity {\n      id\n      from\n      to\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeIngredientGroupFields on IngredientGroup {\n    id\n    title\n    ingredients {\n      ...RecipeIngredientsFields\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeIngredientGroupFields on IngredientGroup {\n    id\n    title\n    ingredients {\n      ...RecipeIngredientsFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeRecipe($id: Int!) {\n      removeRecipe(id: $id) {\n        ...RecipeFragment\n      }\n    }\n  "): (typeof documents)["\n    mutation removeRecipe($id: Int!) {\n      removeRecipe(id: $id) {\n        ...RecipeFragment\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeFragment on Recipe {\n    id\n    title\n    provider\n    assets {\n      id\n      image\n    }\n    servingSize {\n      id\n      unit\n      quantity {\n        id\n        value\n      }\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeFragment on Recipe {\n    id\n    title\n    provider\n    assets {\n      id\n      image\n    }\n    servingSize {\n      id\n      unit\n      quantity {\n        id\n        value\n      }\n    }\n    times {\n      id\n      type\n      quantity {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeCategory($id: Int!) {\n      removeCategory(id: $id) {\n        ...CategoryFields\n      }\n    }\n  "): (typeof documents)["\n    mutation removeCategory($id: Int!) {\n      removeCategory(id: $id) {\n        ...CategoryFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeRecipeFromCategory($id: Int!, $recipeId: Int!) {\n      removeRecipeFromCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  "): (typeof documents)["\n    mutation removeRecipeFromCategory($id: Int!, $recipeId: Int!) {\n      removeRecipeFromCategory(id: $id, recipeId: $recipeId) {\n        ...CategoryDetailFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShoppingListFields on ShoppingList {\n    id\n    count\n    shoppingListIngredients {\n      id\n      ingredient {\n        ...RecipeIngredientsFields\n      }\n    }\n    recipe {\n      id\n      title\n      assets {\n        id\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ShoppingListFields on ShoppingList {\n    id\n    count\n    shoppingListIngredients {\n      id\n      ingredient {\n        ...RecipeIngredientsFields\n      }\n    }\n    recipe {\n      id\n      title\n      assets {\n        id\n        image\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeRecipeFromShoppingList($id: Int!) {\n      removeRecipeFromShoppingList(id: $id) {\n        id\n        count\n      }\n    }\n  "): (typeof documents)["\n    mutation removeRecipeFromShoppingList($id: Int!) {\n      removeRecipeFromShoppingList(id: $id) {\n        id\n        count\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation decrementShoppingListRecipe($id: Int!) {\n      decrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  "): (typeof documents)["\n    mutation decrementShoppingListRecipe($id: Int!) {\n      decrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation incrementShoppingListRecipe($id: Int!) {\n      incrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  "): (typeof documents)["\n    mutation incrementShoppingListRecipe($id: Int!) {\n      incrementShoppingListRecipe(id: $id) {\n        id\n        count\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryDetailFields on Category {\n    id\n    name\n    recipes {\n      ...RecipeFragment\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryDetailFields on Category {\n    id\n    name\n    recipes {\n      ...RecipeFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryFields on Category {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment CategoryFields on Category {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query category($id: Int!) {\n      category(id: $id) {\n        ...CategoryDetailFields\n      }\n    }\n  "): (typeof documents)["\n    query category($id: Int!) {\n      category(id: $id) {\n        ...CategoryDetailFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query recipeGuide($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeGuideFields\n      }\n    }\n  "): (typeof documents)["\n    query recipeGuide($id: Int!) {\n      recipe(id: $id) {\n        ...RecipeGuideFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCategoryName($id: Int!) {\n      category(id: $id) {\n        name\n      }\n    }\n  "): (typeof documents)["\n    query getCategoryName($id: Int!) {\n      category(id: $id) {\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query shoppingList {\n      shoppingList {\n        ...ShoppingListFields\n      }\n    }\n  "): (typeof documents)["\n    query shoppingList {\n      shoppingList {\n        ...ShoppingListFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n      }\n    }\n  "): (typeof documents)["\n    mutation login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query HomeRecipes {\n      recipes {\n        ...RecipeFragment\n      }\n    }\n  "): (typeof documents)["\n    query HomeRecipes {\n      recipes {\n        ...RecipeFragment\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;