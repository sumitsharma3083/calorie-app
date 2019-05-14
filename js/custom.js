var foodName_input = document.querySelector('.food_name')
var foodCal_input  = document.querySelector('.food_calorie')


var addFoodBtn = document.querySelector('.addItem_btn')
var clearAll  = document.querySelector('.clrAllBtn')
var calAmt = document.querySelector('.calAmount')
var listOfItems = document.querySelector('.listOfItems')


var updateBtn = document.querySelector('.updateItem_btn')
var deleteBtn = document.querySelector('.deleteItem_btn')


   if(localStorage.getItem('meals') != null)
   {
         
         let arr = JSON.parse(localStorage.getItem('meals'))
           arr.forEach(obj => {
                calAmt.innerHTML = Number(calAmt.innerHTML) + Number(obj.mealCal)
                 listOfItems.innerHTML +=  `<li class="particular_item"><div><span class="meal_name">${obj.mealname}</span>:<span class="meal_cal">${obj.mealCal} calories</span></div><button class="edit_btn" onclick=editing("${obj.mealname}")><i class="fas fa-pencil-alt"></i></button></li>`
           });
   } 

   addFoodBtn.addEventListener('click', function()
   {
     if(foodName_input.value != '' && foodCal_input.value != ''){
         var  obj = {
             mealname: foodName_input.value,
             mealCal : foodCal_input.value
         }
          if(localStorage.getItem('meals') == null){
              let arr = [];
              calAmt.innerHTML = Number(calAmt.innerHTML)+Number(obj.mealCal)
              listOfItems.innerHTML += `<li class="particular_item"><div><span class="meal_name">${obj.mealname}</span>:<span class="meal_cal">${obj.mealCal} calories</span></div><button class="edit_btn" onclick=editing("${obj.mealname}")><i class="fas fa-pencil-alt"></i></button></li>`
               arr.push(obj)
              localStorage.setItem('meals', JSON.stringify(arr))  
          }
          else
          {
              listOfItems.innerHTML = null
              let arr = JSON.parse(localStorage.getItem('meals'))
              arr.push(obj)

                arr.forEach(obj => {
                  listOfItems.innerHTML += `<li class="particular_item"><div><span class="meal_name">${obj.mealname}</span>:<span class="meal_cal">${obj.mealCal} calories</span></div><button class="edit_btn" onclick=editing("${obj.mealname}")><i class="fas fa-pencil-alt"></i></button></li>`
                     });
            
                   calAmt.innerHTML = Number(calAmt.innerHTML) + Number(obj.mealCal)
                   
                    localStorage.setItem('meals', JSON.stringify(arr)) 
          }
         foodName_input.value = ''
         foodCal_input.value = ''
        }
})


clearAll.addEventListener('click', function(){
    localStorage.removeItem('meals')
    calAmt.innerHTML = 0;
    listOfItems.innerHTML = null;

    addFoodBtn.style.display = 'block'
    updateBtn.style.display  = 'none'
    deleteBtn.style.display  = 'none'
})



function editing(val){
     addFoodBtn.style.display = 'none'
     updateBtn.style.display  = 'inline-block'
     deleteBtn.style.display  = 'inline-block'

     updateBtn.setAttribute('meal_name', val)
     deleteBtn.setAttribute('meal_name', val)

     let items =  JSON.parse(localStorage.getItem('meals'))
     let meal =   items.find((obj)=>{
                    return obj.mealname == val
             })

             foodName_input.value = meal.mealname
             foodCal_input.value  = meal.mealCal
}


updateBtn.addEventListener('click', function(){
    
     listOfItems.innerHTML = null
     calAmt.innerHTML      = null
      
       let arrayOfItems = JSON.parse(localStorage.getItem('meals'))
         
           let obj = {
               mealname:  foodName_input.value ,
               mealCal : foodCal_input.value
           }
     
       let findIndex = arrayOfItems.findIndex((obj)=>{
            return obj.mealname == updateBtn.getAttribute('meal_name')
       })
          arrayOfItems.splice(findIndex, 1, obj)

             arrayOfItems.forEach(obj => {
                calAmt.innerHTML = Number(calAmt.innerHTML) + Number(obj.mealCal)
                listOfItems.innerHTML += `<li class="particular_item"><div class="meals_container"><span class="meal_name">${obj.mealname}</span>:<span class="meal_cal">${obj.mealCal} calories</span></div><button class="edit_btn" onclick=editing("${obj.mealname}") ><i class="fas fa-pencil-alt"></i></button></li>`
             });
        localStorage.setItem('meals', JSON.stringify(arrayOfItems))

       addFoodBtn.style.display = 'block'
       updateBtn.style.display  = 'none'
       deleteBtn.style.display  = 'none'
})

deleteBtn.addEventListener('click', function(){
    listOfItems.innerHTML = null;
    calAmt.innerHTML = null;
      let arrayOfMeal = JSON.parse(localStorage.getItem('meals'))
      
       var getindex =  arrayOfMeal.findIndex((obj)=>{
                return obj.mealname == deleteBtn.getAttribute('meal_name')
       })
   
          arrayOfMeal.splice(getindex, 1);

             arrayOfMeal.forEach(obj => {
                calAmt.innerHTML = Number(calAmt.innerHTML) + Number(obj.mealCal)
                listOfItems.innerHTML += `<li class="particular_item"><div class="meals_container"><span class="meal_name">${obj.mealname}</span>:<span class="meal_cal">${obj.mealCal} calories</span></div><button class="edit_btn" onclick=editing("${obj.mealname}") ><i class="fas fa-pencil-alt"></i></button></li>`
             });
          localStorage.setItem('meals', JSON.stringify(arrayOfMeal))
          foodName_input.value = null
          foodCal_input.value = null

          addFoodBtn.style.display = 'block'
          updateBtn.style.display  = 'none'
          deleteBtn.style.display  = 'none'
})

