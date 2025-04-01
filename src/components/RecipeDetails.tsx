import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe, RecipeListItem } from '../types/recipe';
import Sidebar from './Sidebar';

interface RecipeDetailsProps {
    recipe: Recipe;
    categoryRecipes: RecipeListItem[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, categoryRecipes }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="md:w-1/3 relative">
                            <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                <Image
                                    src={recipe.thumbnail || '/images/placeholder.png'}
                                    alt={recipe.name || "recipie thumbnail"}
                                    layout="fill"
                                />
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>

                            {recipe.area && (
                                <Link href={`/?country=${encodeURIComponent(recipe.area)}`}>
                                    <p className="text-blue-600 hover:text-blue-800 cursor-pointer mb-4">
                                        Cuisine: {recipe.area}
                                    </p>
                                </Link>
                            )}

                            {recipe.category && (
                                <p className="text-gray-700 mb-4">
                                    Category: {recipe.category}
                                </p>
                            )}

                            {recipe.tags && recipe.tags.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-gray-700 mb-1">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {recipe.youtube && (
                                <a
                                    href={recipe.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                >
                                    Watch Video Tutorial
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <Link
                                    key={index}
                                    href={`/?ingredient=${encodeURIComponent(ingredient.name)}`}
                                >
                                    <div className="bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200">
                                        <p className="font-medium text-blue-600 hover:text-blue-800">
                                            {ingredient.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">{ingredient.measure}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        {recipe.instructions?.split('\r\n').map((step, index) => (
                            <p key={index} className="mb-4">
                                {step}
                            </p>
                        ))}
                    </div>

                    {recipe.source && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-gray-600">
                                Source:{' '}
                                <a
                                    href={recipe.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Original Recipe
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-1">
                <Sidebar
                    categoryName={recipe.category || 'Related'}
                    recipes={categoryRecipes}
                />
            </div>
        </div>
    );
};

export default RecipeDetails;