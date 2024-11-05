import { OpenWindow } from "./openWindow.js";
export let categoryMeal = document.querySelector(".categoryMeal");
import { loading } from "./openWindow.js";
import { categoryAlbum, area, areaAlbum } from "./index.js";
import { detalis, fetchApiDetalis } from "./details.js";
export let Ingredients = document.querySelector(".Ingredients");
export let IngredientsAlbum = document.querySelector(".IngredientsAlbum");

/* Category */
export async function getCategory() {
  loading.classList.replace("d-none", "d-flex");
  categoryMeal.innerHTML=""
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let response = await request.json();
  loading.classList.replace("d-flex", "d-none");

  for (let category of response.categories) {
    let meal = new getCategoryData(
      category.strCategory,
      category.idCategory,
      category.strCategoryThumb,
      category.strCategoryDescription
    );
    meal.displayGetCategory();
  }
}

export class getCategoryData {
  constructor(
    strCategory,
    idCategory,
    strCategoryThumb,
    strCategoryDescription
  ) {
    this.strCategory = strCategory;
    this.idCategory = idCategory;
    this.strCategoryThumb = strCategoryThumb;
    this.strCategoryDescription = strCategoryDescription;
  }

  displayGetCategory() {
    let categoryData = `
      <div class="col-md-3 col-sm-12 position-relative">
        <div class="card-img border-0" id="${this.idCategory}">
          <img src="${this.strCategoryThumb}" class="card-img-top w-100 rounded-3" alt="...">
          <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex flex-column align-items-center">
            <h3 class="text-center">${this.strCategory}</h3>
            <p class="ms-2 text-center">${this.strCategoryDescription}</p>
          </div>
        </div>
      </div>`;

    categoryMeal.innerHTML += categoryData;

    let cardMeals = document.querySelectorAll(".card-img");
    cardMeals.forEach((cardMeal) => {
      cardMeal.addEventListener("click", (e) => {
        getMealCategoryAlbum(cardMeal.querySelector("h3").textContent);
        categoryMeal.classList.add("d-none");
        categoryAlbum.classList.remove("d-none");
      });
    });
  }
}

/* Category Album */
async function getMealCategoryAlbum(letter) {
  loading.classList.replace("d-none", "d-flex");
  categoryAlbum.innerHTML=""
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${letter}`
  );
  let response = await request.json();
  let arrOfResult = response.meals;
  loading.classList.replace("d-flex", "d-none");
  let newArr = arrOfResult.slice(0, 20);
  for (let data of newArr) {
    let x = new GetMealAlbum(data.strMeal, data.idMeal, data.strMealThumb);
    x.displayGetAlbumcategory();
  }
}

class GetMealAlbum extends OpenWindow {
  constructor(strMeal, idMeal, strMealThumb) {
    super(strMeal, idMeal, strMealThumb);
  }
  displayGetAlbumcategory() {
    categoryMeal.innerHTML = "";
    let albumData = ` <div class="col-md-3 col-sm-12 position-relative">
        <div class="card-img border-0" id="${this.idMeal}">
          <img src="${this.strMealThumb}" class="card-img-top w-100 rounded-3" alt="...">
          <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex justify-content-start align-items-center">
            <h3 class="ms-2"> ${this.strMeal}</h3>
          </div>
        </div>     
      </div>`;
    categoryAlbum.innerHTML += albumData;
    let dataBody = document.querySelectorAll(".card-img");

    dataBody.forEach((data) => {
      data.addEventListener("click", (e) => {
        let x = data.id;
        fetchApiDetalis(x);
        detalis.classList.remove("d-none");
        categoryAlbum.classList.add("d-none");
      });
    });
  }
}

/* Area */
export async function fetchArea() {
  loading.classList.replace("d-none", "d-flex");
  area.innerHTML =""
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let response = await request.json();
  let areaData = response.meals;
  loading.classList.replace("d-flex", "d-none");

  areaData.forEach((x) => {
    let y = new GetArea(x.strArea);
    y.displayArea();
  });
}

class GetArea {
  constructor(strArea) {
    this.strArea = strArea;
  }
  displayArea() {
    let areaData = `  <div class="col-xl-3 col-md-12">
            <div class="content text-light">
              <i class="fa-solid fa-house-laptop fa-4x fw-bolder"></i>
              <h3>${this.strArea}</h3>
            </div>
          </div>`;
    area.innerHTML += areaData;
    let areaBody = document.querySelectorAll(".content");
    areaBody.forEach((x) => {
      x.addEventListener("click", (e) => {
        area.classList.add("d-none");
        areaAlbum.classList.remove("d-none");
        let y = e.currentTarget.querySelector("h3").textContent;
        fetchApiAreaDetalis(y);
      });
    });
  }
}

/* Area  Detalis*/
async function fetchApiAreaDetalis(letter) {
  loading.classList.replace("d-none", "d-flex");
  areaAlbum.innerHTML =""
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${letter}`
  );
  let response = await request.json();
  let areaData = response.meals;
  let areaSplice = areaData.slice(0, 20);
  loading.classList.replace("d-flex", "d-none");
  areaSplice.forEach((x) => {
    let y = new GetAreaDetails(x.strMeal, x.idMeal, x.strMealThumb);
    y.displayAreaDetalis();
  });
}

class GetAreaDetails extends OpenWindow {
  constructor(strMeal, strMealThumb, idMeal) {
    super(strMeal, strMealThumb, idMeal);
  }
  displayAreaDetalis() {
    let areaDetalis = `
    <div class="col-md-3 col-sm-12 position-relative">
        <div class="card-img border-0" id="${this.idMeal}">
          <img src="${this.strMealThumb}" class="card-img-top w-100 rounded-3" alt="${this.strMealThumb}">
          <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex justify-content-start align-items-center">
            <h3 class="ms-2"> ${this.strMeal}</h3>
          </div>
        </div>     
      </div>`;
    areaAlbum.innerHTML += areaDetalis;
    let areaBody = document.querySelectorAll(".card-img");

    areaBody.forEach((data) => {
      data.addEventListener("click", (e) => {
        let x = data.id;
        detalis.classList.remove("d-none");
        areaAlbum.classList.add("d-none");
        fetchApiDetalis(x);
      });
    });
  }
}


/* ingredients */
export async function fetchIngredients() {
  loading.classList.replace("d-none", "d-flex");
  Ingredients.innerHTML=""
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let response = await request.json();
  let ingredientsData = response.meals;
  let ingredientsOfArr = ingredientsData.slice(0, 20);
  console.log(ingredientsOfArr);
  
  loading.classList.replace("d-flex", "d-none");


  ingredientsOfArr.forEach((z) => {
    let y = new GetIngredients(
      z.idIngredient,
      z.strIngredient,
      z.strDescription.slice(0,100)
    );
    y.displayIngredients();
  });
}

class GetIngredients {
  constructor(idIngredient, strIngredient, strDescription) {
    this.idIngredient = idIngredient;
    this.strIngredient = strIngredient;
    this.strDescription = strDescription;
  }
  displayIngredients() {
      IngredientsAlbum.innerHTML = "";
    let IngredientsData = ` <div class="col-3">
            <div class="content text-light">
              <i class="fa-solid fa-drumstick-bite fa-4x" id=${this.idIngredient}></i>
              <h3>${this.strIngredient}</h3>
              <p>
               ${this.strDescription}
              </p>
            </div>
          </div>`;
    Ingredients.innerHTML += IngredientsData;
    let IngredientsBody = document.querySelectorAll(".content");
    IngredientsBody.forEach((x) => {
      x.addEventListener("click", (e) => {
        Ingredients.classList.add("d-none");
        IngredientsAlbum.classList.remove("d-none");

        let y = e.currentTarget.querySelector("h3").textContent;
        fetchApiIngredientDetalis(y);
      });
    });
  }
}


// /* ingredients detalis */
async function fetchApiIngredientDetalis(letter) {
  loading.classList.replace("d-none", "d-flex");
  
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${letter}`
  );
  let response = await request.json();
  let IngredientData = response.meals;
  let IngredientSplice = IngredientData.slice(0, 20);
  loading.classList.replace("d-flex", "d-none");
  IngredientSplice.forEach((x) => {
    let y = new GetIngredientDetails(x.strMeal, x.idMeal, x.strMealThumb);
    y.displayIngredientDetalis();
  });
}

class GetIngredientDetails extends OpenWindow {
  constructor(strMeal, strMealThumb, idMeal) {
    super(strMeal, strMealThumb, idMeal);
  }
  displayIngredientDetalis() {
    let IngredientDetalis = `
    <div class="col-md-3 col-sm-12 g-3 position-relative">
      <div class="card-img border-0" id="${this.idMeal}">
        <img src="${this.strMealThumb}" class="card-img-top w-100 rounded-3" alt="...">
        <div class="card-body bg-white bg-opacity-75 rounded-3 d-flex justify-content-start align-items-center">
          <h3 class="ms-2"> ${this.strMeal}</h3>
        </div>
      </div>     
    </div>`;
    IngredientsAlbum.innerHTML += IngredientDetalis;
    let IngredientBody = document.querySelectorAll(".card-img");

    IngredientBody.forEach((data) => {
      data.addEventListener("click", (e) => {
        let x = data.id;
        detalis.classList.remove("d-none");
        IngredientsAlbum.classList.add("d-none");
        fetchApiDetalis(x);
      });
    });
   }
}