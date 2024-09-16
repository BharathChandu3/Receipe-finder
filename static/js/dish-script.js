const dishForm = document.getElementById('dishForm'); 
const dishInput = document.getElementById('dishInput');
const dishContainer = document.getElementById('dishContainer');
const prevDishPageBtn = document.getElementById('prevDishPage');
const nextDishPageBtn = document.getElementById('nextDishPage');
const dishModal = document.getElementById('dishModal');
const modalCloseBtn = dishModal.querySelector('.close-btn');
const dishTitle = document.getElementById('dishTitle');
const dishImage = document.getElementById('dishImage');
const ingredientList = document.getElementById('ingredientList');
const dishProcedure = document.getElementById('dishProcedure');
const dishVideo = document.getElementById('dishVideo');

let currentDishPage = 1;
let totalDishResults = 0;

async function fetchDishes(dish, page) {
    const response = await fetch(`/search?dish=${dish}&page=${page}`);
    const data = await response.json();
    totalDishResults = data.totalResults;  
    return data.results;
}

async function fetchDishIngredients(dishId) {
    const response = await fetch(`/dish/${dishId}`);
    const dish = await response.json();
    return dish;
}

function updatePaginationButtons() {
    prevDishPageBtn.disabled = currentDishPage === 1;
    const maxPage = Math.ceil(totalDishResults / 10);
    nextDishPageBtn.disabled = currentDishPage >= maxPage;
}

function displayDishes(dishes) {
    dishContainer.innerHTML = '';
    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.title}">
            <h3>${dish.title}</h3>
            <button class="view-ingredients-btn" data-id="${dish.id}">View Ingredients</button>
        `;
        dishContainer.appendChild(dishCard);

        const viewIngredientsBtn = dishCard.querySelector('.view-ingredients-btn');
        viewIngredientsBtn.addEventListener('click', async () => {
            try {
                const dishDetails = await fetchDishIngredients(dish.id);
                await displayDishDetails(dishDetails);
            } catch (error) {
                console.error('Error displaying dish details:', error);
            }
        });
    });
}

async function displayDishDetails(dishDetails) {
    dishTitle.textContent = dishDetails.title;
    dishImage.src = dishDetails.image;

    ingredientList.innerHTML = '';
    dishProcedure.innerHTML = '';

    dishDetails.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientList.appendChild(li);
    });

    const procedureSteps = dishDetails.instructions.split(/(?:\.\s+|\n)/).filter(step => step.trim() !== '');

    const procedureList = document.createElement('ul');
    procedureSteps.forEach((step, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${step.trim()}`;
        procedureList.appendChild(li);
    });

    dishProcedure.appendChild(procedureList);

    if (dishDetails.videoId) {
        dishVideo.src = `https://www.youtube.com/embed/${dishDetails.videoId}`;
    } else {
        dishVideo.src = '';
    }

    dishModal.style.display = 'flex';
}

dishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dish = dishInput.value.trim();
    if (!dish) {
        alert('Please enter a dish name.');
        return;
    }
    currentDishPage = 1;
    const dishes = await fetchDishes(dish, currentDishPage);
    if (dishes.length > 0) {
        displayDishes(dishes);
        updatePaginationButtons();
    } else {
        dishContainer.innerHTML = '<p>No results found.</p>';
    }
});

nextDishPageBtn.addEventListener('click', async () => {
    currentDishPage++;
    const dish = dishInput.value.trim();
    const dishes = await fetchDishes(dish, currentDishPage);
    if (dishes.length > 0) {
        displayDishes(dishes);
        updatePaginationButtons();
    }
});

prevDishPageBtn.addEventListener('click', async () => {
    currentDishPage--;
    const dish = dishInput.value.trim();
    const dishes = await fetchDishes(dish, currentDishPage);
    if (dishes.length > 0) {
        displayDishes(dishes);
        updatePaginationButtons();
    }
});

modalCloseBtn.addEventListener('click', () => {
    dishModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === dishModal) {
        dishModal.style.display = 'none';
    }
});
