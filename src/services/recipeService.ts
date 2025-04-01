import axios from 'axios';
import { ApiResponse, Recipe, RecipeListItem, RecipeResponse, FilterParams } from '../types/recipe';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getRecipes = async (filters?: FilterParams) => {
  try {
    let endpoint = `${API_URL}/recipes`;

    // Add query parameters if filters are provided
    if (filters) {
      const params = new URLSearchParams();

      if (filters.ingredient) params.append('ingredient', filters.ingredient);
      if (filters.country) params.append('country', filters.country);
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
    }

    const response = await axios.get<ApiResponse<RecipeListItem>>(endpoint);
    return response?.data?.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await axios.get<RecipeResponse>(`${API_URL}/recipes/${id}`);
    return response.data.recipe;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};

export const getTitle = (filters: FilterParams): string => {
  if (filters.ingredient) return `Recipes with ${filters.ingredient}`;
  if (filters.country) return `${filters.country} Recipes`;
  if (filters.category) return `${filters.category} Recipes`;
  if (filters.search) return `Search Results: ${filters.search}`;
  return 'All Recipes';
};
