import React from 'react';
import Link from 'next/link';
import { RecipeListItem } from '../types/recipe';

interface SidebarProps {
    categoryName: string;
    recipes: RecipeListItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ categoryName, recipes }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{categoryName} Recipes</h2>

            {recipes.length === 0 ? (
                <p className="text-gray-500">No related recipes found</p>
            ) : (
                <ul className="space-y-2">
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link href={`/recipe/${recipe.id}`}>
                                <span className="block p-2 hover:bg-gray-100 rounded cursor-pointer">
                                    {recipe.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href={`/?category=${encodeURIComponent(categoryName)}`}>
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        View all {categoryName} recipes →
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;