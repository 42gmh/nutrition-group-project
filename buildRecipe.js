const buildForm = document.querySelector('#build'); 
const plusButton = document.querySelector('#plus');
const submitButton = document.querySelector('#submit');
let items= 1; // counter for number of ingrediants

const addIngrediant = () => {
	items += 1; // Add one to total number of ingrediants
	const br = document.createElement('br');
	const ingrediantLable = document.createElement('label');
	const quantityLable = document.createElement('label');
	const unitLable = document.createElement('label');
	const ingrediantInput = document.createElement('input');
	const quantityInput = document.createElement('input');
	const unitInput = document.createElement('input');
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
	unitInput.type = "text";
	buildForm.removeChild(plusButton);
	buildForm.removeChild(submitButton);
	buildForm.append(br);
	buildForm.append(ingrediantLable);
	buildForm.append(ingrediantInput);
	buildForm.append(unitLable);
	buildForm.append(unitInput);
	buildForm.append(quantityLable);
	buildForm.append(quantityInput);
	buildForm.append(plusButton);
	buildForm.append(submitButton);
}

document.getElementById('plus').addEventListener('click', addIngrediant)