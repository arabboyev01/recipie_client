export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string | null;
  area: string | null;
  instructions: string | null;
  thumbnail: string | null;
  tags: string[];
  youtube: string | null;
  ingredients: Ingredient[];
  source: string | null;
}

export interface RecipeListItem {
  id: string;
  name: string;
  thumbnail: string;
}

export type RecipeCategoryResponse = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};
export type NormalizedRecipe = RecipeCategoryResponse & RecipeListItem;

export interface ApiResponse<T> {
  meals: T[] | null;
}

export interface RecipeResponse {
  recipe: Recipe;
}

export interface FilterParams {
  ingredient?: string;
  country?: string;
  category?: string;
  search?: string;
}