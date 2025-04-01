import React from 'react';
import { RecipeListItem, FilterParams } from '../types/recipe';
import RecipeCard from './RecipeCard';
import { getTitle } from '../services/recipeService';

interface RecipeListProps {
    recipes: RecipeListItem[];
    filters: FilterParams;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, filters }) => {
    const title = getTitle(filters);

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

            {recipes.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No recipes found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;