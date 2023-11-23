import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  //importing 'initializeApp' function for firebase
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  //importing necessary methods


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

onValue(groceriesInBag, function(snapshot){                             //snapshot contains data from the database
    if(snapshot.exists()){                                              //checking if there is any item in the database or if it is null
        let databaseListArray = (Object.entries(snapshot.val()))        //bringing objects both id and values
        clearShoppingListEl()
        for(let i = 0;i<databaseListArray.length;i++){
            let currentItem = databaseListArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addingItemInList(currentItem)
        }    
    }
    else{
        shoppingListEl.innerHTML = "No Items Here.... "
    }
})


function clearInputSection(){
    inputEl.value = ""
}
function addingItemInList(item){
    let newEl = document.createElement("li")                //we create a newEl element which is a listItem
    let itemID = item[0]          
    let itemValue = item[1]         
 
    newEl.textContent = itemValue                         //we put text content inside
    shoppingListEl.append(newEl)                            //we append() that in shoppingListEl or in our ul

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemID = ref(database, `groceris/${itemID}`)     
        remove(exactLocationOfItemID)
    })

}
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}
