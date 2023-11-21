import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  //importing 'initializeApp' function
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  //importing 'getDatabse,ref and push' function


const appSettings = {
    databaseURL : "https://groceriesapp-3b819-default-rtdb.europe-west1.firebasedatabase.app/"  //our database in firebase
}

const app = initializeApp(appSettings)              //initializing firebase app so that we can use firebase database
const database = getDatabase(app)                   //connecting our database 
const groceriesInBag = ref(database, "groceris")    //adding reference to the database and naming items

const inputEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")


addBtnEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(groceriesInBag, inputValue)                //pushing the values in our refrenced database and items

    clearInputSection()
})

onValue(groceriesInBag, function(snapshot){
    let databaseListArray = (Object.entries(snapshot.val()))
    clearShoppingListEl()
    for(let i = 0;i<databaseListArray.length;i++){
        let currentItem = databaseListArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        addingItemInList(currentItemID)
    }
})


function clearInputSection(){
    inputEl.value = ""
}
function addingItemInList(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`

}
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}
