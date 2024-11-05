"use strict";
import { detalis } from "./details.js";
import { Search, randomOne, OpenWindow } from "./openWindow.js";
import { getCategory , categoryMeal , fetchArea , fetchIngredients , Ingredients , IngredientsAlbum} from "./category.js";
//Loading page
import { loading } from "./openWindow.js";
//main page
export let category = document.getElementById("random");
//Links
let linkOne = document.querySelector(".link-1");
let linkTwo = linkOne.nextElementSibling;
let linkThree = linkTwo.nextElementSibling;
let linkFour = linkThree.nextElementSibling;
let linkFive = linkFour.nextElementSibling;
export let categoryAlbum = document.querySelector(".categoryAlbum");
export let area = document.querySelector(".area");
export let areaAlbum = document.querySelector(".areaAlbum");
let header = document.querySelector(".header");

//Fetch api

let random = document.getElementById("random");

async function getRandomMeals() {
  loading.classList.replace("d-none", "d-flex");
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let response = await request.json();
  let meals = response.meals;
  loading.classList.replace("d-flex", "d-none");
  for (let mealData of meals) {
    let meal = new OpenWindow(
      mealData.strMeal,
      mealData.idMeal,
      mealData.strMealThumb
    );
    meal.getRandomData();
  }
}
getRandomMeals();
//------------------------------------------------------------------------------------------------------
//Api Search  



//--------------------------------------------------------------------------------------------------------
//Search
let mealName = document.getElementById("mealName");
let firstLetter = document.getElementById("firstLetter");
let searchOpen = document.querySelector(".searchOpen");

//------------------------------------------------------------------------------------------------------

//Event Listner of Click
let nav = document.querySelector(".nav");
let layer = document.querySelector(".layer");
let closeBar = document.getElementById("closeBar");
let openBar = document.getElementById("openBar");
let tab = document.querySelector(".tab");



document.addEventListener("click", (e) => {
  if (e.target == openBar) {
    nav.classList.remove("d-none");
    openBar.classList.add("d-none");
    closeBar.classList.remove("d-none");
    tab.classList.remove("animate__slideOutDown");
    header.classList.add("animate__slideInLeft");
    tab.classList.add("animate__slideOutDown ");
  }
  if (e.target == closeBar) {
    nav.classList.add("d-none");
    openBar.classList.remove("d-none");
    closeBar.classList.add("d-none");
    tab.classList.add("animate__slideOutDown");
    header.classList.remove("animate__slideInLeft");
  }
  if (e.target == linkOne) {
    nav.classList.add("d-none");
    openBar.classList.remove("d-none");
    closeBar.classList.add("d-none");
    searchOpen.classList.remove("d-none");
    category.classList.add("d-none");
    detalis.classList.add("d-none")
    categoryMeal.classList.add("d-none");
    categoryAlbum.classList.add("d-none");
      area.classList.add("d-none");
      areaAlbum.classList.add("d-none");
      Ingredients.classList.add("d-none")
      IngredientsAlbum.classList.add("d-none");
      contact.classList.add("d-none")
  }

  if(e.target == linkTwo ){
    nav.classList.add("d-none");
    openBar.classList.remove("d-none");
    closeBar.classList.add("d-none");
    searchOpen.classList.add("d-none")
    category.classList.add("d-none");
    detalis.classList.add("d-none");
    categoryMeal.classList.remove("d-none")
    categoryAlbum.classList.add("d-none");
    area.classList.add("d-none");
    areaAlbum.classList.add("d-none");
        Ingredients.classList.add("d-none");
        IngredientsAlbum.classList.add("d-none");
  contact.classList.remove("d-none");

    getCategory()
  }
 if(e.target == linkThree){
  nav.classList.add("d-none");
  openBar.classList.remove("d-none");
  closeBar.classList.add("d-none");
  searchOpen.classList.add("d-none");
  category.classList.add("d-none");
  detalis.classList.add("d-none");
  categoryMeal.classList.add("d-none");
  categoryAlbum.classList.add("d-none");
  area.classList.remove("d-none")
  areaAlbum.classList.add("d-none");
  Ingredients.classList.add("d-none");
  IngredientsAlbum.classList.add("d-none");
  contact.classList.remove("d-none");

  fetchArea();
 } 
 if(e.target == linkFour){
  nav.classList.add("d-none");
  openBar.classList.remove("d-none");
  closeBar.classList.add("d-none");
  searchOpen.classList.add("d-none");
  category.classList.add("d-none");
  detalis.classList.add("d-none");
  categoryMeal.classList.add("d-none");
  categoryAlbum.classList.add("d-none");
  area.classList.add("d-none")
  areaAlbum.classList.add("d-none");
  Ingredients.classList.remove("d-none")
  IngredientsAlbum.classList.add("d-none");
    contact.classList.remove("d-none");

  fetchIngredients();
 } 
 if(e.target == linkFive){
  nav.classList.add("d-none");
  openBar.classList.remove("d-none");
  closeBar.classList.add("d-none");
  // searchOpen.classList.add("d-none");
  category.classList.add("d-none");
  detalis.classList.add("d-none");
  categoryMeal.classList.add("d-none");
  categoryAlbum.classList.add("d-none");
  area.classList.add("d-none")
  areaAlbum.classList.add("d-none");
  Ingredients.classList.add("d-none")
  IngredientsAlbum.classList.add("d-none");
  contact.classList.remove("d-none")
 } 
});

//Event Listener of Input
document.addEventListener("input", (e) => {
  if (e.target == firstLetter) {
    if (firstLetter.value === "") { 
      randomOne.innerHTML = "";
      let search = new Search("a");
      search.searchApiFirstLetter("a");
    } else {
      randomOne.classList.remove("d-none");
      let search = new Search(firstLetter.value);
      search.searchApiFirstLetter(firstLetter.value);
    }
  }
  if(e.target == mealName){
    let search = new Search(mealName.value);
    search.searchApiBYMealName(mealName.value)
  }
});



/* Contact */
let contact = document.querySelector(".contact");
let btnSubmit = document.getElementById("SubmitDone");
/* regax */

let nameInput = document.getElementById("yourName");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phoneNumber");
let ageInput = document.getElementById("age");
let passwordInput = document.getElementById("password");
let repasswordInput = document.getElementById("repassword");

let nameError = document.getElementById("nameError");
 let emailError = document.getElementById("emailError");
 let phoneError = document.getElementById("phoneError");
 let ageError = document.getElementById("ageError");
 let passwordError = document.getElementById("passwordError");
 let repasswordError = document.getElementById("repasswordError");
 console.log(repasswordInput);
 
 let namePattern = /^[A-Za-z\s]+$/;
 let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 let phonePattern = /^[0-9]{10,15}$/;
 let agePattern = /^[1-9][0-9]?$/;
 let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 console.log(namePattern);
 //Event Listener of Input
 document.addEventListener("input" , (e) =>{
  if(e.target == nameInput){
    if (!namePattern.test(nameInput.value)) {
      nameError.classList.remove("d-none")
      btnSubmit.classList.replace("opacity-100", "opacity-50");
    } else {
      nameError.classList.add("d-none")
      btnSubmit.classList.replace("opacity-50", "opacity-100");
    }
    
  }
  if(e.target == emailInput){
    if (!emailPattern.test(emailInput.value)) {
      emailError.classList.remove("d-none")
      btnSubmit.classList.replace("opacity-50", "opacity-100");
    } else {
      emailError.classList.add("d-none")
      btnSubmit.classList.replace("opacity-100", "opacity-50");

    }
    
  }
  if(e.target == phoneInput){
    if (!phonePattern.test(phoneInput.value)) {
      phoneError.classList.remove("d-none")
      btnSubmit.classList.replace("opacity-100", "opacity-50");
    } else {
      phoneError.classList.add("d-none")
      btnSubmit.classList.replace("opacity-50", "opacity-100");
    }
    
  }
  if(e.target == ageInput){
    if (!agePattern.test(ageInput.value)) {
      ageError.classList.remove("d-none")
      btnSubmit.classList.replace("opacity-100", "opacity-50");
    } else {
      ageError.classList.add("d-none")
      btnSubmit.classList.replace("opacity-50", "opacity-100");
    }
    
  }
  if(e.target == passwordInput){
    if (!passwordPattern.test(passwordInput.value) ) {
      passwordError.classList.remove("d-none")
      btnSubmit.classList.replace("opacity-100", "opacity-50");
    }  
    else {
      passwordError.classList.add("d-none")
      btnSubmit.classList.replace("opacity-50", "opacity-100");
    }

    if(e.target == repasswordInput){
      if(passwordInput.value == repasswordInput.value){
        repasswordError.classList.add("d-none")
        btnSubmit.classList.replace("opacity-100", "opacity-50");        
        }
        else{
          repasswordError.classList.remove("d-none")
          btnSubmit.classList.replace("opacity-50", "opacity-100");
          }
    }
  }
 })

