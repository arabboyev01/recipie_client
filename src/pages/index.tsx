import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipes } from '../services/recipeService';
import { RecipeListItem, FilterParams } from '../types/recipe';
import RecipeList from '../components/RecipeList';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    const { ingredient, country, category, search } = router.query;

    const newFilters: FilterParams = {};
    if (typeof ingredient === 'string') newFilters.ingredient = ingredient;
    if (typeof country === 'string') newFilters.country = country;
    if (typeof category === 'string') newFilters.category = category;
    if (typeof search === 'string') newFilters.search = search;

    setFilters(newFilters);

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes(newFilters);

        const normalizedCategoryRecipes = data.map((recipe) => ({
          id: "idMeal" in recipe ? recipe.idMeal : recipe.id,
          name: "strMeal" in recipe ? recipe.strMeal : recipe.name,
          thumbnail: "strMealThumb" in recipe ? recipe.strMealThumb : recipe.thumbnail,
        }));
        setRecipes(normalizedCategoryRecipes as RecipeListItem[]);
        setLoading(false);
        console.log(data)
      } catch (error) {
        console.log(error)
        setLoading(false);
      }

    };

    fetchRecipes();
  }, [router.query]);

  const title = filters.ingredient
    ? `Recipes with ${filters.ingredient}`
    : filters.country
      ? `${filters.country} Recipes`
      : filters.category
        ? `${filters.category} Recipes`
        : filters.search
          ? `Search Results: ${filters.search}`
          : 'All Recipes';

  return (
    <>
      <Head>
        <title>{title} | Recipe App</title>
      </Head>

      <div className="py-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <RecipeList recipes={recipes} filters={filters} />
        )}
      </div>
    </>
  );
}