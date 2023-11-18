import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  //importing 'initializeApp' function
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  //importing 'getDatabse,ref and push' function


const appSettings = {
    databaseURL : "https://groceriesapp-3b819-default-rtdb.europe-west1.firebasedatabase.app/"  //our database in firebase
}

const app = initializeApp(appSettings)              //initializing firebase app so that we can use firebase database
const database = getDatabase(app)                   //connecting our database 
const groceriesInBag = ref(database, "groceris")    //adding reference to the database and naming items

const inputEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")


addBtnEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(groceriesInBag, inputValue)                //pushing the values in our refrenced database and items
    console.log(`${inputValue} added to the databse`)
})