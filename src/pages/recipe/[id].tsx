import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipeById, getRecipes } from '../../services/recipeService';
import { Recipe, RecipeListItem } from '../../types/recipe';
import RecipeDetails from '../../components/RecipeDetails';
import Head from 'next/head';

export default function RecipeDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [categoryRecipes, setCategoryRecipes] = useState<RecipeListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch recipe details when ID changes
        const fetchRecipeDetails = async () => {
            try {
                if (typeof id !== 'string') return;

                setLoading(true);
                const recipeData = await getRecipeById(id);
                setRecipe(recipeData);

                // If recipe has a category, fetch other recipes in the same category
                if (recipeData?.category) {
                    const categoryData = await getRecipes({ category: recipeData.category });
                    const normalizedCategoryRecipes = categoryData.map((recipe) => ({
                        id: "idMeal" in recipe ? recipe.idMeal : recipe.id,
                        name: "strMeal" in recipe ? recipe.strMeal : recipe.name,
                        thumbnail: "strMealThumb" in recipe ? recipe.strMealThumb : recipe.thumbnail,
                    }));
                    // Filter out the current recipe from category recipes
                    const filteredCategoryRecipes = normalizedCategoryRecipes.filter(
                        (item) => item.id !== id
                    );
                    setCategoryRecipes(filteredCategoryRecipes as RecipeListItem[]);
                }

                setLoading(false);
            } catch (error) {
                console.log(error)
            }

        };

        if (id) {
            fetchRecipeDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
                <p className="text-gray-600 mb-6">The recipe you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Go Back to Recipes
                </button>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{recipe.name} | Recipe App</title>
            </Head>

            <div className="py-6">
                <RecipeDetails recipe={recipe} categoryRecipes={categoryRecipes} />
            </div>
        </>
    );
}