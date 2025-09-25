export type Recipe = {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  mealType: string[];
  image: string;
};

export type RecipeSearchResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};