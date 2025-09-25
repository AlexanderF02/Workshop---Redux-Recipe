import { useState } from 'react';
import { useSearchRecipesQuery } from './features/recipes/recipesApi';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';
import { addFavorite, removeFavorite, clearFavorites } from './features/favorites/favoritesSlice';
import './App.css';

function App() {
  const [query, setQuery] = useState('pasta');
  const { data, isFetching, isError, error } = useSearchRecipesQuery({ q: query });
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();

  const isFavorite = (id: number) => favorites.some(fav => fav.id === id);

  return (
    <div className="app-container">
      <h1>Redux Recipe Explorer</h1>
      <div className="search-bar">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="search-input"
        />
        <button onClick={() => setQuery(query)}>Search</button>
      </div>
      <h2>Results</h2>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error: {String(error)}</p>}
      <div className="recipe-list">
        {data?.recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Meal Type: {recipe.mealType.join(', ')}</p>
            <button
              onClick={() =>
                isFavorite(recipe.id)
                  ? dispatch(removeFavorite(recipe.id))
                  : dispatch(addFavorite({ id: recipe.id, name: recipe.name }))
              }
              className={`favorite-btn${isFavorite(recipe.id) ? ' favorite-btn--active' : ''}`}
            >
              {isFavorite(recipe.id) ? 'Remove Favorite' : 'Add Favorite'}
            </button>
            <a href={`https://dummyjson.com/recipes/${recipe.id}`} target="_blank" rel="noopener noreferrer">
              View JSON
            </a>
          </div>
        ))}
      </div>
      <div className="favorites-section">
        <h2>Favorites ({favorites.length})</h2>
        <button onClick={() => dispatch(clearFavorites())} className="clear-all-btn">
          Clear All
        </button>
        <ul className="favorites-list">
          {favorites.map(fav => (
            <li key={fav.id}>
              {fav.name}
              <button onClick={() => dispatch(removeFavorite(fav.id))}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
