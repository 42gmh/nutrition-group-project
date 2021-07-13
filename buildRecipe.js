const buildForm = document.querySelector('#build');
const formDiv = document.querySelector('#form');
const containerDiv = document.querySelector('#container'); 
const plusButton = document.querySelector('#plus');
const submitButton = document.querySelector('#submit');
const servingField = document.getElementsByName('servings')[0];
const servingFieldLabel = document.querySelector('#servings');
const servingDiv = document.querySelector('#serving');
const minusButton = document.createElement('button');
minusButton.textContent ='Remove Ingredient';
minusButton.setAttribute("title", "remove ingredient");
minusButton.setAttribute("type", "button");
minusButton.setAttribute("class", "btn btn-primary");
let items= 1; // counter for number of ingrediants

const addIngrediant = () => {
	const myDIV = document.querySelector(`#ingrediant${items}`)
	items += 1; // Add one to total number of ingrediants
	const br = document.createElement('br');
	const mydiv = document.createElement('div');
	mydiv.setAttribute("class", "list-group-item");
	mydiv.setAttribute("id", `ingrediant${items}`);
	const ingrediantLable = document.createElement('label');
	const quantityLable = document.createElement('label');
	const unitLable = document.createElement('label');
	const ingrediantInput = document.createElement('input');
	//ingrediantInput.required = "true";
	const quantityInput = document.createElement('input');
	//quantityInput.required = "true";
	const unitInput = document.createElement('select');
	//unitInput.required = "true";
	const unitOption1 = document.createElement('option');
	unitOption1.value = "12 grams";
	unitOption1.textContent = "1/8 cup";
	unitInput.append(unitOption1); 
	const unitOption2 = document.createElement('option');
	unitOption2.value = "24 grams";
	unitOption2.textContent = "1/4 cup"; 
	unitInput.append(unitOption2); 
	const unitOption3 = document.createElement('option');
	unitOption3.value = "48 grams";
	unitOption3.textContent = "1/2 cup"; 
	unitInput.append(unitOption3); 
	const unitOption4 = document.createElement('option');
	unitOption4.value = "32 grams";
	unitOption4.textContent = "1/3 cup"; 
	unitInput.append(unitOption4); 
	const unitOption5 = document.createElement('option');
	unitOption5.value = "cups";
	unitOption5.textContent = "cups"; 
	unitInput.append(unitOption5); 
	const unitOption6 = document.createElement('option');
	unitOption6.value = "grams";
	unitOption6.textContent = "grams"; 
	unitInput.append(unitOption6); 
	const unitOption7 = document.createElement('option');
	unitOption7.value = "ounces";
	unitOption7.textContent = "ounces"; 
	unitInput.append(unitOption7); 
	const unitOption8 = document.createElement('option');
	unitOption8.value = "teaspoons";
	unitOption8.textContent = "teaspoons"; 
	unitInput.append(unitOption8); 
	const unitOption9 = document.createElement('option');
	unitOption9.value = "tablespoons";
	unitOption9.textContent = "tablespoons"; 
	unitInput.append(unitOption9); 
	const unitOption10 = document.createElement('option');
	unitOption10.value = "pounds";
	unitOption10.textContent = "pounds"; 
	unitInput.append(unitOption10); 
	ingrediantInput.name = `ingrediant${items}`;
	ingrediantLable.for  = ingrediantInput.name;
	quantityInput.name = `quantity${items}`;
	quantityLable.for = quantityLable.name;
	unitInput.name = `unit${items}`;
	unitLable.for = unitInput.name;
	ingrediantLable.textContent = "Ingrediant";
	ingrediantInput.type = "text";
	quantityLable.textContent = "Quantity";
	quantityInput.type = "number";
	unitLable.textContent = "Unit";
	myDIV.removeChild(plusButton);
	formDiv.removeChild(submitButton);
	formDiv.removeChild(servingDiv);
	formDiv.append(br);
	ingrediantDiv = document.createElement('div');
	unitDiv = document.createElement('div');
	quantityDiv = document.createElement('div');
	ingrediantDiv.append(ingrediantLable);
	ingrediantDiv.append(' ');
	ingrediantDiv.append(ingrediantInput);
	ingrediantDiv.append(' ');
	unitDiv.append(unitLable);
	unitDiv.append(' ');
	unitDiv.append(unitInput);
	unitDiv.append(' ');
	quantityDiv.append(quantityLable);
	quantityDiv.append(' ');
	quantityDiv.append(quantityInput);
	quantityDiv.append(' ');
	mydiv.append(ingrediantDiv);
	mydiv.append(unitDiv);
	mydiv.append(quantityDiv);
	mydiv.append(plusButton);
	mydiv.append(minusButton);
	minusButton.addEventListener('click', removeIngrediant);
	formDiv.append(mydiv);
	formDiv.append(br)
	formDiv.append(servingDiv);
	formDiv.append(submitButton);
}


const removeIngrediant = () => {
	const a = document.querySelector(`#ingrediant${items}`);
	a.removeChild(plusButton);
	formDiv.removeChild(a);
	items -= 1;
	document.querySelectorAll(`input`).forEach(item => item.validity.valid = "true");
	document.querySelector(`#ingrediant${items}`).append(plusButton);
	if (items > 1) {
	document.querySelector(`#ingrediant${items}`).append(minusButton);
	}
}

const userQuery = () => { // Takes user input and formats it for use with Nutrition Analysis API
	let ingrediant = document.getElementsByName(`ingrediant${items}`)[0];
	let quantity = document.getElementsByName(`quantity${items}`)[0];
	let unit = document.getElementsByName(`unit${items}`)[0];
	let recipe = [`${quantity.value}%20${unit.value}%20${ingrediant.value}`];
	console.log(recipe);
	let items2 = items
	items2 -= 1;
	while (items2) {
	let ingrediantValue = document.getElementsByName(`ingrediant${items2}`)[0].value;
	let quantityValue = document.getElementsByName(`quantity${items2}`)[0].value;
	let unitValue = document.getElementsByName(`unit${items2}`)[0].value;
	recipe.unshift(`${quantityValue}%20${unitValue}%20${ingrediantValue}`);
	items2 -= 1;
	console.log(recipe);
	}
			
	return recipe;	
}



const displayNutrition = (nutritionData) => {
	const servings = document.querySelector('#serv').value;
	const container = document.createElement('div');
	const vitCard = document.createElement('div');
	vitCard.class = "card";
	//container.class = "my-container";
	container.setAttribute("class", "card");
	console.log(container.class);
	container.id = "nutritionData";
	const heading = document.createElement('h2');
	heading.innerHTML = `Per Serving ${Math.floor(nutritionData.totalWeight/servings)} <abbr title="Grams">g</abbr>`;
	heading.setAttribute("class", "card-title")
	const heading2 = document.createElement('h2');
	heading2.textContent = `Servings ${servings}`;
	heading2.setAttribute("class", "card-title")
	const calories = document.createElement('h3');
	calories.setAttribute("class", "card-title")
	calories.textContent = `Calories ${Math.floor(nutritionData.Calories/servings)}`;

	const vitamins = document.createElement('ul');
	vitamins.setAttribute("class", "list-group list-group-flush");
	const iron = document.createElement('li');
	iron.setAttribute("class", "list-group-item");
	iron.innerHTML = `Iron: ${Math.floor(nutritionData.Iron/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(iron);
	const magnesium = document.createElement('li');
	magnesium.setAttribute("class", "list-group-item");
	magnesium.innerHTML = `Magnesium: ${Math.floor(nutritionData.Magnesium/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(magnesium);
	const niacin = document.createElement('li');
	niacin.setAttribute("class", "list-group-item");
	niacin.innerHTML = `Vitamin B3: ${Math.floor(nutritionData.Niacin/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(niacin);
	const phosphorus = document.createElement('li');
	phosphorus.setAttribute("class", "list-group-item");
	phosphorus.innerHTML = `Phosphorus: ${Math.floor(nutritionData.Phosphorus/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(phosphorus);
	const potassium = document.createElement('li');
	potassium.setAttribute("class", "list-group-item");
	potassium.innerHTML = `Potassium: ${Math.floor(nutritionData.Potassium/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(potassium);
	const riboflavin = document.createElement('li');
	riboflavin.setAttribute("class", "list-group-item");
	riboflavin.innerHTML = `Vitamin B2: ${Math.floor(nutritionData.Riboflavin/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(riboflavin);
	const thiamin = document.createElement('li');
	thiamin.setAttribute("class", "list-group-item");
	thiamin.innerHTML = `Vitamin B1: ${Math.floor(nutritionData.Thiamin/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(thiamin);
	const vitaminA = document.createElement('li');
	vitaminA.setAttribute("class", "list-group-item");
	vitaminA.innerHTML = `Vitamin A: ${Math.floor(nutritionData.VitaminA/servings)} <abbr title="Micrograms">µg</abbr>`;
	vitamins.append(vitaminA);
	const vitaminB12 = document.createElement('li');
	vitaminB12.setAttribute("class", "list-group-item");
	vitaminB12.innerHTML = `Vitamin B12: ${Math.floor(nutritionData.VitaminB12/servings)} <abbr title="Micrograms">µg</abbr>`;
	vitamins.append(vitaminB12);
	const vitaminB6 = document.createElement('li');
	vitaminB6.setAttribute("class", "list-group-item");
	vitaminB6.innerHTML = `Vitamin B6: ${Math.floor(nutritionData.VitaminB6/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(vitaminB6);
	const vitaminC = document.createElement('li');
	vitaminC.setAttribute("class", "list-group-item");
	vitaminC.innerHTML = `Vitamin C: ${Math.floor(nutritionData.VitaminC/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(vitaminC);
	const vitaminD = document.createElement('li');
	vitaminD.setAttribute("class", "list-group-item");
	vitaminD.innerHTML = `Vitamin D: ${Math.floor(nutritionData.VitaminD/servings)} <abbr title="Micrograms">µg</abbr>`;
	vitamins.append(vitaminD);
	const vitaminE = document.createElement('li');
	vitaminE.setAttribute("class", "list-group-item");
	vitaminE.innerHTML = `Vitamin E: ${Math.floor(nutritionData.VitaminE/servings)} <abbr title="Milligram">mg</abbr>`;
	vitamins.append(vitaminE);
	const vitaminK = document.createElement('li');
	vitaminK.setAttribute("class", "list-group-item");
	vitaminK.innerHTML = `Vitamin K: ${Math.floor(nutritionData.VitaminK/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(vitaminK);
	const zinc = document.createElement('li');
	zinc.setAttribute("class", "list-group-item");
	zinc.innerHTML = `Zinc: ${Math.floor(nutritionData.Zinc/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(zinc);
	const calcium = document.createElement('li');
	calcium.setAttribute("class", "list-group-item");
	calcium.innerHTML = `Calcium: ${Math.floor(nutritionData.Calcium/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(calcium);
	const sodium = document.createElement('li');
	sodium.setAttribute("class", "list-group-item");
	sodium.innerHTML = `Sodium: ${Math.floor(nutritionData.Sodium/servings)} <abbr title="Milligrams">mg</abbr>`;
	vitamins.append(sodium);
	
	const nutrition = document.createElement('ul');
	nutrition.setAttribute("class", "list-group list-group-flush");
	const carbs = document.createElement('li');
	carbs.setAttribute("class", "list-group-item");
	carbs.innerHTML = `Carbohydrates: ${Math.floor(nutritionData.Carbs/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(carbs);
	const sugar = document.createElement('li');
	sugar.setAttribute("class", "list-group-item");
	sugar.innerHTML = `Sugars: ${Math.floor(nutritionData.Sugar/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(sugar);
	const fiber = document.createElement('li');
	fiber.setAttribute("class", "list-group-item");
	fiber.innerHTML = `Fiber: ${Math.floor(nutritionData.Fiber/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(fiber);
	const cholesterol = document.createElement('li');
	cholesterol.setAttribute("class", "list-group-item");
	cholesterol.innerHTML = `Cholesterol: ${Math.floor(nutritionData.Chole/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(cholesterol);
	const fat = document.createElement('li');
	fat.setAttribute("class", "list-group-item");
	fat.innerHTML = `Fat: ${Math.floor(nutritionData.Fat/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(fat);
	const monoFat = document.createElement('li');
	monoFat.setAttribute("class", "list-group-item");
	monoFat.innerHTML = `Monounsaturated Fat: ${Math.floor(nutritionData.Mono/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(monoFat);
	const polyFat = document.createElement('li');
	polyFat.setAttribute("class", "list-group-item");
	polyFat.innerHTML = `Polyunsaturated Fat: ${Math.floor(nutritionData.Poly/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(polyFat);
	const satFat = document.createElement('li');
	satFat.setAttribute("class", "list-group-item");
	satFat.innerHTML = `Saturated Fat: ${Math.floor(nutritionData.Sat/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(satFat);
	const transFat = document.createElement('li');
	transFat.setAttribute("class", "list-group-item");
	transFat.innerHTML = `Trans Fat: ${Math.floor(nutritionData.Trans/servings)} <abbr title="Grams">g</abbr>`;
	nutrition.append(transFat);
	const protein = document.createElement('li');
	protein.setAttribute("class", "list-group-item");
	protein.innerHTML = `Protein: ${Math.floor(nutritionData.Protein/servings)} <abbr title="Grams">g</abbr>`;
	const resetButton = document.createElement('button');
	resetButton.innerHTML = "Get Data For Another Recipe";
	resetButton.setAttribute("type", "button");
	resetButton.setAttribute("class", "list-group-item btn-primary");
	nutrition.append(protein);
	container.append(heading2);
	container.append(heading);
	container.append(calories);
	container.append(nutrition);
	vitCard.append(vitamins);
	container.append(vitCard);
	container.append(resetButton);
	buildForm.hidden = true;
	containerDiv.append(container);
	resetButton.addEventListener("click", evt => resetForm());
}

const resetForm = () => {
	containerDiv.removeChild(document.querySelector('#nutritionData'));
	buildForm.hidden = false;
	console.log(items);
	while (items > 1) {
		removeIngrediant();
	}
}

let appID = 'PROVIDE_ME';
let appKey = 'PROVIDE_ME';




document.getElementById('plus').addEventListener('click', addIngrediant);

buildForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	let fields = document.querySelectorAll('input'); // grab all input fields
	fields.forEach(field => field.required = "true"); // sets input fields to required
	const isValid = (field) => field.validity.valid; //checks validity of input field
	//fields = Array.prototype.slice.call(fields) 	
	fields = Array.from(fields); // converts nodeList into array
	if (fields.every((field) => isValid(field))){ // checks that all fields are valid before proceeding

	let query = userQuery(); // formats input values for fetch requests
	console.log(query);
	let i = 0;
	const promiseArray = query.map(query => {	
	return fetch(`https://api.edamam.com/api/nutrition-data?app_id=${appID}&app_key=${appKey}&nutrition-type=cooking&ingr=${query}`)
	.then(response => response.json())
	})


	responseArray = Promise.all(promiseArray);
	responseArray
	.then(array => {
		console.log(array);
		const nutritionValues = { // initilizes object to store agregate nutrition values from every ingrediant
			Calories: 0,
			Fat: 0,
			Trans: 0,
			Mono: 0,
			Poly: 0,
			Sat: 0,
			Chole: 0,
			Carbs: 0,
			Sugar: 0,
			Calcium: 0,
			Iron: 0,
			Fiber: 0,
			Potassium: 0,
			Magnesium: 0,
			Sodium: 0,
			Niacin: 0,
			Phosphorus: 0,
			Protein: 0,
			Riboflavin: 0,
			Thiamin: 0,
			VitaminE: 0,
			VitaminA: 0,
			VitaminB12: 0,
			VitaminB6: 0,
			VitaminC: 0,
			VitaminD: 0,
			VitaminK: 0,
			Zinc: 0,
			totalWeight: 0	
		}
		array.forEach(item => {
			let inputValue = document.getElementsByName(`ingrediant${i+1}`)[0];
			inputValue.setCustomValidity('');
			if (item.totalWeight) {
				nutritionValues.Calories += item.calories;
				if (item.totalNutrients.FAT) { 
				nutritionValues.Fat += item.totalNutrients.FAT.quantity; 
				} 
				if (item.totalNutrients.FASAT) { 
				nutritionValues.Sat += item.totalNutrients.FASAT.quantity;
				} 
				if (item.totalNutrients.FATRN) { 
				nutritionValues.Trans += item.totalNutrients.FATRN.quantity;
				} 
				if (item.totalNutrients.CA) { 
				nutritionValues.Calcium += item.totalNutrients.CA.quantity;
				} 
				if (item.totalNutrients.CHOCDF) { 
				nutritionValues.Carbs += item.totalNutrients.CHOCDF.quantity; 
				} 
				if (item.totalNutrients.CHOLE) { 
				nutritionValues.Chole += item.totalNutrients.CHOLE.quantity; 
				} 
				if (item.totalNutrients.FAMS) { 
				nutritionValues.Mono += item.totalNutrients.FAMS.quantity; 
				} 
				if (item.totalNutrients.FAPU) { 
				nutritionValues.Poly += item.totalNutrients.FAPU.quantity; 
				} 
				if (item.totalNutrients.FE) { 
				nutritionValues.Iron += item.totalNutrients.FE.quantity; 
				} 
				if (item.totalNutrients.FIBTG) { 
				nutritionValues.Fiber += item.totalNutrients.FIBTG.quantity; 
				} 
				if (item.totalNutrients.K) { 
				nutritionValues.Potassium += item.totalNutrients.K.quantity; 
				} 
				if (item.totalNutrients.MG) { 
				nutritionValues.Magnesium += item.totalNutrients.MG.quantity; 
				} 
				if (item.totalNutrients.NA) { 
				nutritionValues.Sodium += item.totalNutrients.NA.quantity; 
				} 
				if (item.totalNutrients.NIA) { 
				nutritionValues.Niacin += item.totalNutrients.NIA.quantity; 
				} 
				if (item.totalNutrients.P) { 
				nutritionValues.Phosphorus += item.totalNutrients.P.quantity; 
				} 
				if (item.totalNutrients.PROCNT) { 
				nutritionValues.Protein += item.totalNutrients.PROCNT.quantity; 
				} 
				if (item.totalNutrients.RIBF) { 
				nutritionValues.Riboflavin += item.totalNutrients.RIBF.quantity; 
				} 
				if (item.totalNutrients.SUGAR) { 
				nutritionValues.Sugar += item.totalNutrients.SUGAR.quantity; 
				} 
				if (item.totalNutrients.THIA) { 
				nutritionValues.Thiamin += item.totalNutrients.THIA.quantity; 
				} 
				if (item.totalNutrients.TOCHPA) { 
				nutritionValues.VitaminE += item.totalNutrients.TOCHPA.quantity; 
				} 
				if (item.totalNutrients.VITA) { 
				nutritionValues.VitaminA += item.totalNutrients.VITA.quantity; 
				} 
				if (item.totalNutrients.VITB12) { 
				nutritionValues.VitaminB12 += item.totalNutrients.VITB12.quantity; 
				} 
				if (item.totalNutrients.VITB6A) { 
				nutritionValues.VitaminB6 += item.totalNutrients.VITB6A.quantity; 
				} 
				if (item.totalNutrients.VITC) { 
				nutritionValues.VitaminC += item.totalNutrients.VITC.quantity; 
				} 
				if (item.totalNutrients.VITD) { 
				nutritionValues.VitaminD += item.totalNutrients.VITD.quantity; 
				} 
				if (item.totalNutrients.VITK1) { 
				nutritionValues.VitaminK += item.totalNutrients.VITK1.quantity; 
				} 
				if (item.totalNutrients.ZN) { 
				nutritionValues.Zinc += item.totalNutrients.ZN.quantity; 
				} 
				nutritionValues.totalWeight += item.totalWeight;
			} else {
					//alert(`${inputValue} is not a valid ingredient. Nutrition information includes any valid ingredients entered`);
					inputValue.setAttribute("class", "not-valid");
					//inputValue.setAttribute("isvalid", "false");
					inputValue.setCustomValidity('Please enter a valid ingredient');
					inputValue.addEventListener('input', () => {
					inputValue.setAttribute("class", "");
					//inputValue.setAttribute("isvalid", "true");
					 inputValue.setCustomValidity(""); 
					})
					items = i+1;
					throw new Error(`Ingredient is Invalid`);	
			} 
			i += 1;	
		})
		console.log(nutritionValues);
		displayNutrition(nutritionValues);
	}).catch(error => console.log(error))
}
})
	

