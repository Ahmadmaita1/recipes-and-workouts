// Fetch Recipes from Spoonacular API
async function searchRecipes() {
    const query = document.getElementById("recipeInput").value.trim();
    const resultsContainer = document.getElementById("recipeResults");

    resultsContainer.innerHTML = ""; // Clear previous results

    if (!query) {
        resultsContainer.innerHTML = "<p>Please enter an ingredient to search.</p>";
        return;
    }

    const apiKey = "3b60c931c43649f7b9880d0f0455e5f4";
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            resultsContainer.innerHTML = "<p>No recipes found. Try another ingredient.</p>";
            return;
        }

        data.results.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-text">
                    <h3>${recipe.title}</h3>
                    <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
                    <button class="fav-btn" onclick="saveToFavorites('${recipe.title}', '${recipe.image}', '${recipe.id}')">⭐ Add to Favorites</button>
                </div>
            `;
            resultsContainer.appendChild(recipeCard);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

// Save Recipes to Favorites (Local Storage)
function saveToFavorites(title, image, id) {
    let favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

    // Check if recipe already exists
    if (favorites.some(recipe => recipe.id === id)) {
        alert("This recipe is already in favorites!");
        return;
    }

    favorites.push({ title, image, id });
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
    displayFavorites();
}

// Display Favorite Recipes
function displayFavorites() {
    const favoritesContainer = document.getElementById("favorites");
    favoritesContainer.innerHTML = ""; // Clear previous content

    let favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorite recipes yet.</p>";
        return;
    }

    favorites.forEach(recipe => {
        const favCard = document.createElement("div");
        favCard.classList.add("recipe-card");

        favCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-text">
                <h3>${recipe.title}</h3>
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
                <button class="remove-btn" onclick="removeFavorite('${recipe.id}')">❌ Remove</button>
            </div>
        `;
        favoritesContainer.appendChild(favCard);
    });
}

// Remove Recipe from Favorites
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    favorites = favorites.filter(recipe => recipe.id !== id);
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
    displayFavorites();
}

// Fetch Workouts from API-Ninjas
async function searchWorkouts() {
    const query = document.getElementById("workoutInput").value.trim();
    const resultsContainer = document.getElementById("workoutResults");

    resultsContainer.innerHTML = ""; 

    if (!query) {
        resultsContainer.innerHTML = "<p>Please enter a workout type to search.</p>";
        return;
    }

    const apiKey = "Tab5RFZ9BUmW3OaasR//pQ==U92IXyObsb5Erzba";
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=${query}`;

    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': apiKey }
        });
        const data = await response.json();

        if (data.length === 0) {
            resultsContainer.innerHTML = "<p>No workouts found. Try another type.</p>";
            return;
        }

        data.forEach(workout => {
            const workoutCard = document.createElement("div");
            workoutCard.classList.add("workout-card");

            workoutCard.innerHTML = `
                <div class="workout-text">
                    <h3>${workout.name}</h3>
                    <a href="https://www.google.com/search?q=${workout.name}" target="_blank">Learn More</a>
                </div>
            `;
            resultsContainer.appendChild(workoutCard);
        });

    } catch (error) {
        console.error("Error fetching workouts:", error);
        resultsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

// Load favorites when the page loads
document.addEventListener("DOMContentLoaded", displayFavorites);
