console.log("Hello search.js");

const searchRecipesInput = getElem("id-search-recipes");
const noResults = getElem("my-p-no-results");
const results = getElem("my-div-results");

let info = {
    "appid" : "PROVIDE ME",
    "appkey" : "PROVIDE ME"
};

document.getElementById("btn-search").addEventListener("click", (event) => {
    console.log("click", event);
    console.log(searchRecipesInput.value);

    if(searchRecipesInput.value)
    {
        let recipeToSearchFor = searchRecipesInput.value; 
        let SEARCH_URI = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeToSearchFor}&app_id=${info.appid}&app_key=${info.appkey}`
        fetch(SEARCH_URI)
            .then((response) => processResponse(response))
            .catch((error) => alert(error));
    }
});

function processResponse(response) {
    if (200 == response.status) {
        response.json().then((data) => {
            console.log(data);

            if(!data.count) {
                showNoResults();
            }
            else {
                clearResults();

                data.hits.forEach(hit => {
                    // console.log(hit);
                    results.appendChild(makeACard(hit.recipe));
                });
                showResults();
            }
        });
    }
    else {
        throw ("There was an error:" + response.status + " " + response.statusText);
    }
}

function showNoResults()
{
    showElem(noResults);
    hideElem(results);
}

function showResults()
{
    showElem(results);
    hideElem(noResults);
}

function showElem(element)
{
    element.style.display = 'grid';
}

function hideElem(element)
{
    element.style.display = 'none';
}

function getElem(elementId)
{
    return document.getElementById(elementId);
}

function makeACard(recipe)
{
    console.log(recipe);
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "18rem";

    let imgRecipe = document.createElement("img");
    imgRecipe.classList.add("card-img-top");
    imgRecipe.src = recipe.image;
    imgRecipe.alt = "Picture of " + recipe.label + " from " + recipe.source;
    cardDiv.appendChild(imgRecipe);

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardBodyDiv.classList.add("d-flex");
    cardBodyDiv.classList.add("flex-column");
    cardDiv.appendChild(cardBodyDiv);

    let linkToRecipe = document.createElement("a");
    linkToRecipe.href = recipe.url;

    let recipeTitle = document.createElement("h5");
    recipeTitle.classList.add("card-title");
    recipeTitle.textContent = recipe.label;
    linkToRecipe.appendChild(recipeTitle);

    let recipeSource = document.createElement("h6");
    recipeSource.classList.add("card-title");
    recipeSource.textContent = "Source: " + recipe.source;
    linkToRecipe.appendChild(recipeSource);

    cardBodyDiv.appendChild(linkToRecipe);

    let calorieText = document.createElement("p");
    calorieText.textContent = "Calories: " + Math.trunc(recipe.calories);
    cardBodyDiv.appendChild(calorieText);

    let linkToNutrition = document.createElement("a");
    linkToNutrition.href = recipe.shareAs;
    linkToNutrition.classList.add("btn");
    linkToNutrition.classList.add("btn-outline-dark");
    linkToNutrition.classList.add("btn-sm");
    linkToNutrition.classList.add("btn-block");
    linkToNutrition.classList.add("mt-auto");
    linkToNutrition.textContent = "Nutrition Details";
    cardBodyDiv.appendChild(linkToNutrition);

    return cardDiv
}

function clearResults()
{
    while (results.firstChild) {
        results.removeChild(results.lastChild);
    }
}

/* <div class="card" id="aCard" style="width: 18rem;">
    <img id = "anImg" src="..." class="card-img-top" alt="...">
    <div class="card-body" id="aCardBody">
        <a href="" id="linkToRecipe">
            <h5 class="card-title" id="aCardTitle">Recipe</h5>
            <h6 class="card-title" id="aCardSource">Source</h6>
        </a>
        <p class="card-text" id= "aCardCalories">Calories</p>
        <a href="#" id="btnNutrionInfo" class="btn btn-primary btn-sm">More Nutrition Info</a>
    </div>
</div>    */
