function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// ISSUE #1 fermer la modale
function closeModal() {
  modalbg.style.display = "none";
}
document.addEventListener("click", function(event) {
  if (event.target == modalbg || event.target.classList.contains("close")) {
    closeModal();
  }
});




// ISSUE #2 IMPLÉMENTER ENTRÉES DU FORMULAIRE
function validateForm() {
  // DOM ELEMENTS :
  const form = document.getElementById("form");


  // ERRORS MESSAGES VARIABLES
  const nameErrorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  const emailErrorMessage = "Veuillez entrer une adresse e-mail valide.";
  const birthdateErrorMessage = "Vous devez entrer votre date de naissance.";
  const quantityErrorMessage = "Veuillez entrer une valeur numérique";
  const locationErrorMessage = "Vous devez choisir une option.";
  const cguErrorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";

  // REGEX
  const nameRegex = /^[a-zA-Z- ]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const quantityRegex = /^([1-9]|[1-9][0-9])$/;

// FORM VALIDATION
const inputs = form.querySelectorAll('input');

for (let i = 0; i < inputs.length; i++) {
  let input = inputs[i];
  let regex, errorMessage;
  switch (input.name) {
    case 'first':
    case 'last':
      regex = nameRegex;
      errorMessage = nameErrorMessage;
      break;
    case 'email':
      regex = emailRegex;
      errorMessage = emailErrorMessage;
      break;
    case 'quantity':
      regex = quantityRegex;
      errorMessage = quantityErrorMessage;
      break;
    default:
      continue;
  }
  input.addEventListener('change', function() {
    validateInput(this, regex, errorMessage);
  });
}

const validateInput = function (input, regex, errorMessage) {
  let isValid = regex.test(input.value);
  if (isValid) {
    input.classList.remove('error-block');
    input.classList.add('success-block');
    let small = input.nextElementSibling;
    small.innerText = '';
    small.classList.remove('error-message')
  } else {
    input.classList.remove('success-block');
    input.classList.add('error-block');
    let small = input.nextElementSibling;
    small.innerText = errorMessage;
    small.classList.add('error-message')
  }
};
  // prevent form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

