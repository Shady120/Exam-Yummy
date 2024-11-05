import { OpenWindow } from "./openWindow.js";
import { loading } from "./openWindow.js";



export let detalis = document.querySelector(".detalis");

export async function fetchApiDetalis(id) {
  loading.classList.replace("d-none", "d-flex");
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let x = [];
  let response = await request.json();
  let mealDetalis = response.meals[0];
  loading.classList.replace("d-flex", "d-none");
  let mealDetali = new GetApiDetalis(
    mealDetalis.idMeal,
    mealDetalis.strMeal,
    mealDetalis.strMealThumb,
    mealDetalis.strTags,
    mealDetalis.strCategory,
    mealDetalis.strArea,
    mealDetalis.strInstructions,
    mealDetalis.strIngredient1,
    mealDetalis.strIngredient2,
    mealDetalis.strIngredient3,
    mealDetalis.strIngredient4,
    mealDetalis.strIngredient5,
    mealDetalis.strIngredient6,
    mealDetalis.strIngredient7,
    mealDetalis.strIngredient8,
    mealDetalis.strIngredient9,
    mealDetalis.strIngredient10,
    mealDetalis.strIngredient11,
    mealDetalis.strIngredient12,
    mealDetalis.strIngredient13,
    mealDetalis.strIngredient14,
    mealDetalis.strIngredient15,
    mealDetalis.strIngredient16,
    mealDetalis.strIngredient17,
    mealDetalis.strIngredient18,
    mealDetalis.strIngredient19,
    mealDetalis.strIngredient20,
    mealDetalis.strYoutube,
    mealDetalis.strSource
  );
  mealDetali.displayMealDetalis();
}

export class GetApiDetalis extends OpenWindow {
  constructor(
    strMeal,
    idMeal,
    strMealThumb,
    strTags,
    strCategory,
    strArea,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strYoutube,
    strSource
  ) {
    super(idMeal, strMeal, strMealThumb);
    this.strTags = strTags;
    this.strCategory = strCategory;
    this.strArea = strArea;
    this.strInstructions = strInstructions;
    this.strIngredients = [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
      strIngredient16,
      strIngredient17,
      strIngredient18,
      strIngredient19,
      strIngredient20,
    ];
    this.strYoutube = strYoutube;
    this.strSource = strSource;
  }

  displayMealDetalis() {
    let x = [];
    for (let i = 1; i < this.strIngredients.length; i++) {
      if (this.strIngredients[i] !== "") {
        x.push(this.strIngredients[i]);
      }
    }
    let y = [];
    if (this.strTags) {
      y = this.strTags.split(",");
    }

    let ingredientsList = x
      .map(
        (ingredient) =>
          `<li class="m-2 p-1 w alert alert-info">${ingredient}</li>`
      )
      .join("");
    let tagsList = y
      .map((tag) => `<li class="m-2 p-1 w alert alert-info">${tag}</li>`)
      .join("");
    detalis.innerHTML = `
      <div class="col-xl-4 col-md-4 col-sm-12">
        <div class="content">
          <img src="${this.strMealThumb}" class="w-100 rounded-3" alt="">
          <h3 class= "mt-2">${this.strMeal}</h3>
        </div>     
      </div>
      <div class="col-8">
        <div class="content">
          <h2>Instructions</h2>
          <p>${this.strInstructions}</p>
          <h3 class="fw-bolder fs-3">Area : ${this.strArea}</h3>
          <h3 class="fw-bolder fs-3">Category : ${this.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredientsList}</ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsList}</ul>
          <div class="button">
            <button class="btn btn-success href="${this.strSource}">Soruce</button>
            <button class="btn btn-danger" href="${this.strYoutube}">Youtube</button>
          </div>
        </div>
      </div>
    `;

    let btnScusses = document
      .querySelector(".btn-success")
      .addEventListener("click", () => {
        window.open(this.strSource);
      });
    let btnDanger = document
      .querySelector(".btn-danger")
      .addEventListener("click", () => {
        window.open(this.strYoutube);
      });
    let closeBtn = document.getElementById("closeBtn");
  }
}
