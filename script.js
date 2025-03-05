//  Fetch Recipes from Spoonacular API
async function searchRecipes() {
    const query = document.getElementById("recipeInput").value.trim();
    const resultsContainer = document.getElementById("recipeResults");
    
    resultsContainer.innerHTML = ""; 

    if (!query) {
        resultsContainer.innerHTML = "<p>Please enter an ingredient to search.</p>";
        return;
    }

    const apiKey = "3b60c931c43649f7b9880d0f0455e5f4"; 
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.results.length === 0) {
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
                    <p>${recipe.summary ? recipe.summary.slice(0, 150) + '...' : 'Click on the button to read more...'}</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
                </div>
            `;
            resultsContainer.appendChild(recipeCard);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

//  Fetch Workouts from API-Ninjas
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
            headers: {
                'X-Api-Key': apiKey,
            }
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
document.addEventListener("DOMContentLoaded", function () {
    const wheel = document.querySelector(".wheel");
    const spinButton = document.getElementById("spinButton");
    const resultText = document.getElementById("result");

    const challenges = [
        "Make a dish with only 3 ingredients!",
        "Cook something in under 20 minutes!",
        "No oven allowed!",
        "Make something spicy!",
        "Prepare a healthy dish!",
        "Only breakfast recipes allowed!",
        "Make a sweet treat!",
        "Surprise! Make anything!"
    ];

    let spinning = false;

    spinButton.addEventListener("click", function () {
        if (spinning) return;
        spinning = true;

        let randomAngle = 360 * 5 + Math.floor(Math.random() * 360);
        wheel.style.transform = `rotate(${randomAngle}deg)`;

        setTimeout(() => {
            spinning = false;
            let finalAngle = randomAngle % 360;
            let selectedChallengeIndex = Math.floor(finalAngle / 45);
            resultText.textContent = `🎉 ${challenges[selectedChallengeIndex]} 🎉`;
            triggerConfetti();
        }, 3000);
    });

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
