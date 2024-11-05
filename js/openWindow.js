import { detalis, fetchApiDetalis } from "./details.js";
import { category } from "./index.js";

export let searchOpen = document.querySelector(".searchOpen");
export let loading = document.querySelector(".loading-screen");
export let randomOne = document.getElementById("random1");
export class OpenWindow {
  constructor(strMeal, idMeal, strMealThumb) {
    this.strMeal = strMeal;
    this.idMeal = idMeal;
    this.strMealThumb = strMealThumb;
  }

  getRandomData() {
    let cards = `
    <div class="col-md-3 col-sm-12 position-relative">
      <div class="card-img border-0" id="${this.idMeal}">
        <img src="${this.strMealThumb}" class="card-img-top w-100 rounded-3" alt="...">
        <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex justify-content-start align-items-center">
          <h3 class="ms-2"> ${this.strMeal}</h3>
        </div>
      </div>     
    </div>`;
    random.innerHTML += cards;
    let cardClick = document.querySelectorAll(".card-body");
    cardClick.forEach((meal) => {
      meal.addEventListener("click", (e) => {
        let mealId = e.currentTarget.parentElement.id;
        fetchApiDetalis(mealId);
        category.classList.add("d-none");
        detalis.classList.remove("d-none");
        searchClose.classList.add("d-none");
      });
    });
  }

  getSearchData() {
    random.innerHTML = "";
    randomOne.innerHTML += `
    <div class="col-md-3 col-sm-12 position-relative">
      <div class="card-img border-0" id="${this.idMeal}">
        <img src="${this.strMealThumb}" class="card-img-top w-100 rounded-3" alt="...">
        <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex justify-content-start align-items-center">
          <h3 class="ms-2"> ${this.strMeal}</h3>
        </div>
      </div>     
    </div>`;
    let cardClick = document.querySelectorAll(".card-body");
    cardClick.forEach((meal) => {
      meal.addEventListener("click", (e) => {
        let mealId = e.currentTarget.parentElement.id;
        fetchApiDetalis(mealId);
        searchOpen.classList.add("d-none");
        detalis.classList.remove("d-none");
        category.classList.add("d-none");
      });
    });
  }
}

export class Search {
  constructor(mealName, firstLetter) {
    this.mealName = mealName;
    this.firstLetter = firstLetter;
  }

  async searchApiFirstLetter(name) {
    loading.classList.replace("d-none", "d-flex");
    let request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
    );

    let response = await request.json();
    let meals = response.meals;
    loading.classList.replace("d-flex", "d-none");
    randomOne.innerHTML = "";
    if (meals) {
      for (let mealData of meals) {
        let meal = new OpenWindow(
          mealData.strMeal,
          mealData.idMeal,
          mealData.strMealThumb
        );
        meal.getSearchData();
      }
    }
  }

  async searchApiBYMealName(letter) {
    loading.classList.replace("d-none", "d-flex");
    let request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
    );

    let response = await request.json();
    let meals = response.meals;
    randomOne.innerHTML = "";
    loading.classList.replace("d-flex", "d-none");
    if (meals) {
      for (let mealData of meals) {
        let meal = new OpenWindow(
          mealData.strMeal,
          mealData.idMeal,
          mealData.strMealThumb
        );
        meal.getSearchData();
      }
    }
  }
}
