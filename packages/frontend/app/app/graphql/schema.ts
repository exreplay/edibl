import { cacheExchange } from '@urql/exchange-graphcache';
import type { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AdditionalInformation = {
  __typename?: 'AdditionalInformation';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  recipes?: Maybe<Array<Recipe>>;
  updatedAt: Scalars['DateTime']['output'];
};

/** The difficulty of the recipe */
export enum Difficulty {
  Advanced = 'ADVANCED',
  Easy = 'EASY',
  Medium = 'MEDIUM'
}

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  optional: Scalars['Boolean']['output'];
  quantity: Quantity;
  unit?: Maybe<Unit>;
};

export type IngredientGroup = {
  __typename?: 'IngredientGroup';
  id: Scalars['Int']['output'];
  ingredients: Array<Ingredient>;
  title?: Maybe<Scalars['String']['output']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<Array<Category>>;
  addRecipeToCategory?: Maybe<Category>;
  addRecipeToShoppingList?: Maybe<Array<ShoppingList>>;
  decrementShoppingListRecipe?: Maybe<ShoppingList>;
  incrementShoppingListRecipe?: Maybe<ShoppingList>;
  login?: Maybe<LoginResult>;
  register?: Maybe<User>;
  removeCategory?: Maybe<Array<Category>>;
  removeRecipe?: Maybe<Recipe>;
  removeRecipeFromCategory?: Maybe<Category>;
  removeRecipeFromShoppingList?: Maybe<ShoppingList>;
  scrape?: Maybe<Recipe>;
  updateCategory?: Maybe<Array<Category>>;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddRecipeToCategoryArgs = {
  id: Scalars['Int']['input'];
  recipeId: Scalars['Int']['input'];
};


export type MutationAddRecipeToShoppingListArgs = {
  recipeId: Scalars['Int']['input'];
  shoppingListId: Scalars['Int']['input'];
};


export type MutationDecrementShoppingListRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationIncrementShoppingListRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRecipeFromCategoryArgs = {
  id: Scalars['Int']['input'];
  recipeId: Scalars['Int']['input'];
};


export type MutationRemoveRecipeFromShoppingListArgs = {
  id: Scalars['Int']['input'];
};


export type MutationScrapeArgs = {
  provider: Provider;
  url: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Nutrition = {
  __typename?: 'Nutrition';
  id: Scalars['Int']['output'];
  number: Scalars['Float']['output'];
  type: NutritionType;
  unit: Unit;
};

export type NutritionGroup = {
  __typename?: 'NutritionGroup';
  id: Scalars['Int']['output'];
  nutritions?: Maybe<Array<Nutrition>>;
  quantity: Scalars['Float']['output'];
  unit: Unit;
};

/** The type of nutrition */
export enum NutritionType {
  Carbohydrate = 'CARBOHYDRATE',
  DietaryFiber = 'DIETARY_FIBER',
  Fat = 'FAT',
  Kilocalorie = 'KILOCALORIE',
  Kilojoule = 'KILOJOULE',
  Protein = 'PROTEIN',
  SaturatedFat = 'SATURATED_FAT',
  Sodium = 'SODIUM'
}

export enum Provider {
  Cookidoo = 'cookidoo'
}

export type Quantity = {
  __typename?: 'Quantity';
  from?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  to?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  me: User;
  recipe?: Maybe<Recipe>;
  recipes?: Maybe<Array<Recipe>>;
  recipesByIds?: Maybe<Array<Recipe>>;
  shoppingList?: Maybe<Array<ShoppingList>>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  additionalInformation: Array<AdditionalInformation>;
  assets: Array<Asset>;
  createdAt: Scalars['DateTime']['output'];
  difficulty: Difficulty;
  foreignId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  ingredientGroups: Array<IngredientGroup>;
  nutritionGroups: Array<NutritionGroup>;
  provider: Provider;
  servingSize: ServingSize;
  stepGroups: Array<StepGroup>;
  tags: Array<Tag>;
  times: Array<Time>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ServingSize = {
  __typename?: 'ServingSize';
  id: Scalars['Int']['output'];
  quantity: Quantity;
  unit: Unit;
};

export type ShoppingList = {
  __typename?: 'ShoppingList';
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  recipe: Recipe;
  shoppingListIngredients: Array<ShoppingListIngredient>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShoppingListIngredient = {
  __typename?: 'ShoppingListIngredient';
  bought: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  ingredient: Ingredient;
  updatedAt: Scalars['DateTime']['output'];
};

export type Step = {
  __typename?: 'Step';
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type StepGroup = {
  __typename?: 'StepGroup';
  id: Scalars['Int']['output'];
  steps: Array<Step>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Time = {
  __typename?: 'Time';
  id: Scalars['Int']['output'];
  quantity: Quantity;
  type: Scalars['String']['output'];
};

/** The unit of measurement */
export enum Unit {
  Bunch = 'BUNCH',
  Can = 'CAN',
  Cup = 'CUP',
  Gram = 'GRAM',
  HeapedTablespoon = 'HEAPED_TABLESPOON',
  HeapedTeaspoon = 'HEAPED_TEASPOON',
  Kilocalorie = 'KILOCALORIE',
  Kilogram = 'KILOGRAM',
  Kilojoule = 'KILOJOULE',
  LevelTeaspoon = 'LEVEL_TEASPOON',
  Liter = 'LITER',
  Milligram = 'MILLIGRAM',
  Milliliter = 'MILLILITER',
  Package = 'PACKAGE',
  Piece = 'PIECE',
  Pieces = 'PIECES',
  Pinch = 'PINCH',
  Pinches = 'PINCHES',
  Portion = 'PORTION',
  Portions = 'PORTIONS',
  Slice = 'SLICE',
  Stem = 'STEM',
  Strip = 'STRIP',
  Tablespoon = 'TABLESPOON',
  Teaspoon = 'TEASPOON'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AdditionalInformation?: (data: WithTypename<AdditionalInformation>) => null | string,
  Asset?: (data: WithTypename<Asset>) => null | string,
  Category?: (data: WithTypename<Category>) => null | string,
  Ingredient?: (data: WithTypename<Ingredient>) => null | string,
  IngredientGroup?: (data: WithTypename<IngredientGroup>) => null | string,
  LoginResult?: (data: WithTypename<LoginResult>) => null | string,
  Nutrition?: (data: WithTypename<Nutrition>) => null | string,
  NutritionGroup?: (data: WithTypename<NutritionGroup>) => null | string,
  Quantity?: (data: WithTypename<Quantity>) => null | string,
  Recipe?: (data: WithTypename<Recipe>) => null | string,
  ServingSize?: (data: WithTypename<ServingSize>) => null | string,
  ShoppingList?: (data: WithTypename<ShoppingList>) => null | string,
  ShoppingListIngredient?: (data: WithTypename<ShoppingListIngredient>) => null | string,
  Step?: (data: WithTypename<Step>) => null | string,
  StepGroup?: (data: WithTypename<StepGroup>) => null | string,
  Tag?: (data: WithTypename<Tag>) => null | string,
  Time?: (data: WithTypename<Time>) => null | string,
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    categories?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Category> | string>>,
    category?: GraphCacheResolver<WithTypename<Query>, QueryCategoryArgs, WithTypename<Category> | string>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    recipe?: GraphCacheResolver<WithTypename<Query>, QueryRecipeArgs, WithTypename<Recipe> | string>,
    recipes?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Recipe> | string>>,
    recipesByIds?: GraphCacheResolver<WithTypename<Query>, QueryRecipesByIdsArgs, Array<WithTypename<Recipe> | string>>,
    shoppingList?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<ShoppingList> | string>>
  },
  AdditionalInformation?: {
    content?: GraphCacheResolver<WithTypename<AdditionalInformation>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<AdditionalInformation>, Record<string, never>, Scalars['Int'] | string>
  },
  Asset?: {
    id?: GraphCacheResolver<WithTypename<Asset>, Record<string, never>, Scalars['Int'] | string>,
    image?: GraphCacheResolver<WithTypename<Asset>, Record<string, never>, Scalars['String'] | string>,
    video?: GraphCacheResolver<WithTypename<Asset>, Record<string, never>, Scalars['String'] | string>
  },
  Category?: {
    createdAt?: GraphCacheResolver<WithTypename<Category>, Record<string, never>, Scalars['DateTime'] | string>,
    id?: GraphCacheResolver<WithTypename<Category>, Record<string, never>, Scalars['Int'] | string>,
    name?: GraphCacheResolver<WithTypename<Category>, Record<string, never>, Scalars['String'] | string>,
    recipes?: GraphCacheResolver<WithTypename<Category>, Record<string, never>, Array<WithTypename<Recipe> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<Category>, Record<string, never>, Scalars['DateTime'] | string>
  },
  Ingredient?: {
    id?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, Scalars['Int'] | string>,
    name?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, Scalars['String'] | string>,
    notes?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, Scalars['String'] | string>,
    optional?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, Scalars['Boolean'] | string>,
    quantity?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, WithTypename<Quantity> | string>,
    unit?: GraphCacheResolver<WithTypename<Ingredient>, Record<string, never>, Unit | string>
  },
  IngredientGroup?: {
    id?: GraphCacheResolver<WithTypename<IngredientGroup>, Record<string, never>, Scalars['Int'] | string>,
    ingredients?: GraphCacheResolver<WithTypename<IngredientGroup>, Record<string, never>, Array<WithTypename<Ingredient> | string>>,
    title?: GraphCacheResolver<WithTypename<IngredientGroup>, Record<string, never>, Scalars['String'] | string>
  },
  LoginResult?: {
    token?: GraphCacheResolver<WithTypename<LoginResult>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<LoginResult>, Record<string, never>, WithTypename<User> | string>
  },
  Nutrition?: {
    id?: GraphCacheResolver<WithTypename<Nutrition>, Record<string, never>, Scalars['Int'] | string>,
    number?: GraphCacheResolver<WithTypename<Nutrition>, Record<string, never>, Scalars['Float'] | string>,
    type?: GraphCacheResolver<WithTypename<Nutrition>, Record<string, never>, NutritionType | string>,
    unit?: GraphCacheResolver<WithTypename<Nutrition>, Record<string, never>, Unit | string>
  },
  NutritionGroup?: {
    id?: GraphCacheResolver<WithTypename<NutritionGroup>, Record<string, never>, Scalars['Int'] | string>,
    nutritions?: GraphCacheResolver<WithTypename<NutritionGroup>, Record<string, never>, Array<WithTypename<Nutrition> | string>>,
    quantity?: GraphCacheResolver<WithTypename<NutritionGroup>, Record<string, never>, Scalars['Float'] | string>,
    unit?: GraphCacheResolver<WithTypename<NutritionGroup>, Record<string, never>, Unit | string>
  },
  Quantity?: {
    from?: GraphCacheResolver<WithTypename<Quantity>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Quantity>, Record<string, never>, Scalars['Int'] | string>,
    to?: GraphCacheResolver<WithTypename<Quantity>, Record<string, never>, Scalars['Float'] | string>,
    value?: GraphCacheResolver<WithTypename<Quantity>, Record<string, never>, Scalars['Float'] | string>
  },
  Recipe?: {
    additionalInformation?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<AdditionalInformation> | string>>,
    assets?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<Asset> | string>>,
    createdAt?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Scalars['DateTime'] | string>,
    difficulty?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Difficulty | string>,
    foreignId?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Scalars['Int'] | string>,
    ingredientGroups?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<IngredientGroup> | string>>,
    nutritionGroups?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<NutritionGroup> | string>>,
    provider?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Provider | string>,
    servingSize?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, WithTypename<ServingSize> | string>,
    stepGroups?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<StepGroup> | string>>,
    tags?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<Tag> | string>>,
    times?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Array<WithTypename<Time> | string>>,
    title?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Recipe>, Record<string, never>, Scalars['DateTime'] | string>
  },
  ServingSize?: {
    id?: GraphCacheResolver<WithTypename<ServingSize>, Record<string, never>, Scalars['Int'] | string>,
    quantity?: GraphCacheResolver<WithTypename<ServingSize>, Record<string, never>, WithTypename<Quantity> | string>,
    unit?: GraphCacheResolver<WithTypename<ServingSize>, Record<string, never>, Unit | string>
  },
  ShoppingList?: {
    count?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, Scalars['Int'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, Scalars['DateTime'] | string>,
    id?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, Scalars['Int'] | string>,
    recipe?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, WithTypename<Recipe> | string>,
    shoppingListIngredients?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, Array<WithTypename<ShoppingListIngredient> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<ShoppingList>, Record<string, never>, Scalars['DateTime'] | string>
  },
  ShoppingListIngredient?: {
    bought?: GraphCacheResolver<WithTypename<ShoppingListIngredient>, Record<string, never>, Scalars['Boolean'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<ShoppingListIngredient>, Record<string, never>, Scalars['DateTime'] | string>,
    id?: GraphCacheResolver<WithTypename<ShoppingListIngredient>, Record<string, never>, Scalars['Int'] | string>,
    ingredient?: GraphCacheResolver<WithTypename<ShoppingListIngredient>, Record<string, never>, WithTypename<Ingredient> | string>,
    updatedAt?: GraphCacheResolver<WithTypename<ShoppingListIngredient>, Record<string, never>, Scalars['DateTime'] | string>
  },
  Step?: {
    id?: GraphCacheResolver<WithTypename<Step>, Record<string, never>, Scalars['Int'] | string>,
    text?: GraphCacheResolver<WithTypename<Step>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Step>, Record<string, never>, Scalars['String'] | string>
  },
  StepGroup?: {
    id?: GraphCacheResolver<WithTypename<StepGroup>, Record<string, never>, Scalars['Int'] | string>,
    steps?: GraphCacheResolver<WithTypename<StepGroup>, Record<string, never>, Array<WithTypename<Step> | string>>,
    title?: GraphCacheResolver<WithTypename<StepGroup>, Record<string, never>, Scalars['String'] | string>
  },
  Tag?: {
    id?: GraphCacheResolver<WithTypename<Tag>, Record<string, never>, Scalars['Int'] | string>,
    name?: GraphCacheResolver<WithTypename<Tag>, Record<string, never>, Scalars['String'] | string>
  },
  Time?: {
    id?: GraphCacheResolver<WithTypename<Time>, Record<string, never>, Scalars['Int'] | string>,
    quantity?: GraphCacheResolver<WithTypename<Time>, Record<string, never>, WithTypename<Quantity> | string>,
    type?: GraphCacheResolver<WithTypename<Time>, Record<string, never>, Scalars['String'] | string>
  },
  User?: {
    email?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  addCategory?: GraphCacheOptimisticMutationResolver<MutationAddCategoryArgs, Maybe<Array<WithTypename<Category>>>>,
  addRecipeToCategory?: GraphCacheOptimisticMutationResolver<MutationAddRecipeToCategoryArgs, Maybe<WithTypename<Category>>>,
  addRecipeToShoppingList?: GraphCacheOptimisticMutationResolver<MutationAddRecipeToShoppingListArgs, Maybe<Array<WithTypename<ShoppingList>>>>,
  decrementShoppingListRecipe?: GraphCacheOptimisticMutationResolver<MutationDecrementShoppingListRecipeArgs, Maybe<WithTypename<ShoppingList>>>,
  incrementShoppingListRecipe?: GraphCacheOptimisticMutationResolver<MutationIncrementShoppingListRecipeArgs, Maybe<WithTypename<ShoppingList>>>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, Maybe<WithTypename<LoginResult>>>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, Maybe<WithTypename<User>>>,
  removeCategory?: GraphCacheOptimisticMutationResolver<MutationRemoveCategoryArgs, Maybe<Array<WithTypename<Category>>>>,
  removeRecipe?: GraphCacheOptimisticMutationResolver<MutationRemoveRecipeArgs, Maybe<WithTypename<Recipe>>>,
  removeRecipeFromCategory?: GraphCacheOptimisticMutationResolver<MutationRemoveRecipeFromCategoryArgs, Maybe<WithTypename<Category>>>,
  removeRecipeFromShoppingList?: GraphCacheOptimisticMutationResolver<MutationRemoveRecipeFromShoppingListArgs, Maybe<WithTypename<ShoppingList>>>,
  scrape?: GraphCacheOptimisticMutationResolver<MutationScrapeArgs, Maybe<WithTypename<Recipe>>>,
  updateCategory?: GraphCacheOptimisticMutationResolver<MutationUpdateCategoryArgs, Maybe<Array<WithTypename<Category>>>>
};

export type GraphCacheUpdaters = {
  Query?: {
    categories?: GraphCacheUpdateResolver<{ categories: Maybe<Array<WithTypename<Category>>> }, Record<string, never>>,
    category?: GraphCacheUpdateResolver<{ category: Maybe<WithTypename<Category>> }, QueryCategoryArgs>,
    me?: GraphCacheUpdateResolver<{ me: WithTypename<User> }, Record<string, never>>,
    recipe?: GraphCacheUpdateResolver<{ recipe: Maybe<WithTypename<Recipe>> }, QueryRecipeArgs>,
    recipes?: GraphCacheUpdateResolver<{ recipes: Maybe<Array<WithTypename<Recipe>>> }, Record<string, never>>,
    recipesByIds?: GraphCacheUpdateResolver<{ recipesByIds: Maybe<Array<WithTypename<Recipe>>> }, QueryRecipesByIdsArgs>,
    shoppingList?: GraphCacheUpdateResolver<{ shoppingList: Maybe<Array<WithTypename<ShoppingList>>> }, Record<string, never>>
  },
  Mutation?: {
    addCategory?: GraphCacheUpdateResolver<{ addCategory: Maybe<Array<WithTypename<Category>>> }, MutationAddCategoryArgs>,
    addRecipeToCategory?: GraphCacheUpdateResolver<{ addRecipeToCategory: Maybe<WithTypename<Category>> }, MutationAddRecipeToCategoryArgs>,
    addRecipeToShoppingList?: GraphCacheUpdateResolver<{ addRecipeToShoppingList: Maybe<Array<WithTypename<ShoppingList>>> }, MutationAddRecipeToShoppingListArgs>,
    decrementShoppingListRecipe?: GraphCacheUpdateResolver<{ decrementShoppingListRecipe: Maybe<WithTypename<ShoppingList>> }, MutationDecrementShoppingListRecipeArgs>,
    incrementShoppingListRecipe?: GraphCacheUpdateResolver<{ incrementShoppingListRecipe: Maybe<WithTypename<ShoppingList>> }, MutationIncrementShoppingListRecipeArgs>,
    login?: GraphCacheUpdateResolver<{ login: Maybe<WithTypename<LoginResult>> }, MutationLoginArgs>,
    register?: GraphCacheUpdateResolver<{ register: Maybe<WithTypename<User>> }, MutationRegisterArgs>,
    removeCategory?: GraphCacheUpdateResolver<{ removeCategory: Maybe<Array<WithTypename<Category>>> }, MutationRemoveCategoryArgs>,
    removeRecipe?: GraphCacheUpdateResolver<{ removeRecipe: Maybe<WithTypename<Recipe>> }, MutationRemoveRecipeArgs>,
    removeRecipeFromCategory?: GraphCacheUpdateResolver<{ removeRecipeFromCategory: Maybe<WithTypename<Category>> }, MutationRemoveRecipeFromCategoryArgs>,
    removeRecipeFromShoppingList?: GraphCacheUpdateResolver<{ removeRecipeFromShoppingList: Maybe<WithTypename<ShoppingList>> }, MutationRemoveRecipeFromShoppingListArgs>,
    scrape?: GraphCacheUpdateResolver<{ scrape: Maybe<WithTypename<Recipe>> }, MutationScrapeArgs>,
    updateCategory?: GraphCacheUpdateResolver<{ updateCategory: Maybe<Array<WithTypename<Category>>> }, MutationUpdateCategoryArgs>
  },
  Subscription?: {},
  AdditionalInformation?: {
    content?: GraphCacheUpdateResolver<Maybe<WithTypename<AdditionalInformation>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<AdditionalInformation>>, Record<string, never>>
  },
  Asset?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Asset>>, Record<string, never>>,
    image?: GraphCacheUpdateResolver<Maybe<WithTypename<Asset>>, Record<string, never>>,
    video?: GraphCacheUpdateResolver<Maybe<WithTypename<Asset>>, Record<string, never>>
  },
  Category?: {
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Category>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Category>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Category>>, Record<string, never>>,
    recipes?: GraphCacheUpdateResolver<Maybe<WithTypename<Category>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Category>>, Record<string, never>>
  },
  Ingredient?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>,
    notes?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>,
    optional?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>,
    quantity?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>,
    unit?: GraphCacheUpdateResolver<Maybe<WithTypename<Ingredient>>, Record<string, never>>
  },
  IngredientGroup?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<IngredientGroup>>, Record<string, never>>,
    ingredients?: GraphCacheUpdateResolver<Maybe<WithTypename<IngredientGroup>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<IngredientGroup>>, Record<string, never>>
  },
  LoginResult?: {
    token?: GraphCacheUpdateResolver<Maybe<WithTypename<LoginResult>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<LoginResult>>, Record<string, never>>
  },
  Nutrition?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Nutrition>>, Record<string, never>>,
    number?: GraphCacheUpdateResolver<Maybe<WithTypename<Nutrition>>, Record<string, never>>,
    type?: GraphCacheUpdateResolver<Maybe<WithTypename<Nutrition>>, Record<string, never>>,
    unit?: GraphCacheUpdateResolver<Maybe<WithTypename<Nutrition>>, Record<string, never>>
  },
  NutritionGroup?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<NutritionGroup>>, Record<string, never>>,
    nutritions?: GraphCacheUpdateResolver<Maybe<WithTypename<NutritionGroup>>, Record<string, never>>,
    quantity?: GraphCacheUpdateResolver<Maybe<WithTypename<NutritionGroup>>, Record<string, never>>,
    unit?: GraphCacheUpdateResolver<Maybe<WithTypename<NutritionGroup>>, Record<string, never>>
  },
  Quantity?: {
    from?: GraphCacheUpdateResolver<Maybe<WithTypename<Quantity>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Quantity>>, Record<string, never>>,
    to?: GraphCacheUpdateResolver<Maybe<WithTypename<Quantity>>, Record<string, never>>,
    value?: GraphCacheUpdateResolver<Maybe<WithTypename<Quantity>>, Record<string, never>>
  },
  Recipe?: {
    additionalInformation?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    assets?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    difficulty?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    foreignId?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    ingredientGroups?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    nutritionGroups?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    provider?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    servingSize?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    stepGroups?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    tags?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    times?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Recipe>>, Record<string, never>>
  },
  ServingSize?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<ServingSize>>, Record<string, never>>,
    quantity?: GraphCacheUpdateResolver<Maybe<WithTypename<ServingSize>>, Record<string, never>>,
    unit?: GraphCacheUpdateResolver<Maybe<WithTypename<ServingSize>>, Record<string, never>>
  },
  ShoppingList?: {
    count?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>,
    recipe?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>,
    shoppingListIngredients?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingList>>, Record<string, never>>
  },
  ShoppingListIngredient?: {
    bought?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingListIngredient>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingListIngredient>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingListIngredient>>, Record<string, never>>,
    ingredient?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingListIngredient>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<ShoppingListIngredient>>, Record<string, never>>
  },
  Step?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Step>>, Record<string, never>>,
    text?: GraphCacheUpdateResolver<Maybe<WithTypename<Step>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<Step>>, Record<string, never>>
  },
  StepGroup?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<StepGroup>>, Record<string, never>>,
    steps?: GraphCacheUpdateResolver<Maybe<WithTypename<StepGroup>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<StepGroup>>, Record<string, never>>
  },
  Tag?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Tag>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Tag>>, Record<string, never>>
  },
  Time?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Time>>, Record<string, never>>,
    quantity?: GraphCacheUpdateResolver<Maybe<WithTypename<Time>>, Record<string, never>>,
    type?: GraphCacheUpdateResolver<Maybe<WithTypename<Time>>, Record<string, never>>
  },
  User?: {
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof cacheExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};