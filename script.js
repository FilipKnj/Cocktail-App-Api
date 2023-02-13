const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=`;
const searchBtn = document.querySelector('#searchBtn');
const result = document.querySelector('.result');

const getCoctail = () => {
    let inputVal = document.querySelector('input').value;

    if(inputVal.length === 0){
        result.innerHTML = `<h2>Enter Coctail Name</h2>`
    }else{
        fetch(`${url}${inputVal}`).then(res => res.json()).then(data => {
            let myDrink = data.drinks[0];
            let count = 1;
            let ingredients = [];
            for (let i in myDrink) {
                let ingredient = '';
                let measure = '';
                if(i.startsWith('strIngredient') && myDrink[i]){
                    ingredient = myDrink[i];
                    if(myDrink['strMeasure' + count]){
                        measure = myDrink['strMeasure' + count];
                    }else{
                        measure = '';
                    }
                    count++;
                    ingredients.push(`${measure} ${ingredient}`);
                };
            };

            result.innerHTML = `
                <img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">
                <h2>${data.drinks[0].strDrink}</h2>
                <div class="ingredients">
                    <h4>Ingredients</h4>
                    <ul class='ingredients-list'>
                    </ul>
                </div>
                <div class="instructions">
                    <h4>Instructions</h4>
                    <p>${data.drinks[0].strInstructions}</p>
                </div>
            `;

            let ingredientsCon = document.querySelector('.ingredients-list');
            ingredients.forEach(item => {
                let listItem = document.createElement('li');
                listItem.innerText = item;
                ingredientsCon.appendChild(listItem);
            })
            
        }).catch(() => {
            result.innerHTML = `<h2>Enter Valid Coctail Name</h2>`
        })
    }
}


searchBtn.addEventListener('click', getCoctail)