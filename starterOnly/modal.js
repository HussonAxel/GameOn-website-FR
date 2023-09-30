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
document.addEventListener("click", function (event) {
  if (event.target == modalbg || event.target.classList.contains("close")) {
    closeModal();
  }
});

const modalSubmitBtn = document.querySelector(".btn-submit");
const modalBody = document.querySelector(".modal-body");
// validate form function
function validateForm() {
  // DOM ELEMENTS :
  const form = document.getElementById("form");
  const cguCheckbox = form.cguCheckbox;
  const cguErrorElement = document.getElementById("cguError");
  const formVille = document.getElementById("formVille");
  const errorElement = formVille.nextElementSibling;

  // ERRORS MESSAGES VARIABLES
  const nameErrorMessage =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  const emailErrorMessage = "Veuillez entrer une adresse e-mail valide.";
  const birthdateErrorMessage = "Vous devez entrer votre date de naissance.";
  const quantityErrorMessage = "Veuillez entrer une valeur numérique";
  const locationErrorMessage = "Vous devez choisir une option.";
  const cguErrorMessage =
    "Vous devez vérifier que vous acceptez les termes et conditions.";

  // REGEX
  const nameRegex = /^[a-zA-Z- ]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const quantityRegex = /^([1-9]|[1-9][0-9])$/;
  const birthdateRegex =
    /^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; // FORM VALIDATION WHILE WRITING
  const validateInput = function (input, regex, errorMessage) {
    let isValid = regex.test(input.value);
    if (isValid) {
      input.classList.remove("error-block");
      input.classList.add("success-block");
      let errorElement = input.nextElementSibling;
      errorElement.innerText = "";
      errorElement.classList.remove("error-message");
      return true;
    } else {
      input.classList.remove("success-block");
      input.classList.add("error-block");
      let errorElement = input.nextElementSibling;
      errorElement.innerText = errorMessage;
      errorElement.classList.add("error-message");
      return false;
    }
  };

  // FORM VALIDATION WHILE SUBMITTING
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isFormValid = true;

    // Validation des champs
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      let regex, errorMessage;
      switch (input.name) {
        case "first":
        case "last":
          regex = nameRegex;
          errorMessage = nameErrorMessage;
          break;
        case "email":
          regex = emailRegex;
          errorMessage = emailErrorMessage;
          break;
        case "birthdate":
          regex = birthdateRegex;
          errorMessage = birthdateErrorMessage;
          break;
        case "quantity":
          regex = quantityRegex;
          errorMessage = quantityErrorMessage;
          break;
        default:
          return;
      }
      if (!validateInput(input, regex, errorMessage)) {
        isFormValid = false;
      }
    });

    // Validation des checkboxes
    const locationCheckboxes = form.querySelectorAll('input[name="location"]');
    let locationChecked = false;
    locationCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        locationChecked = true;
      }
    });
    if (locationChecked) {
      errorElement.innerText = "";
      errorElement.classList.remove("error-message");
    } else {
      errorElement.innerText = locationErrorMessage;
      errorElement.classList.add("error-message");
      isFormValid = false;
    }

    // Validation des CGU checkbox
    if (cguCheckbox.checked) {
      cguErrorElement.innerText = "";
      cguErrorElement.classList.remove("error-message");
    } else {
      cguErrorElement.innerText = cguErrorMessage;
      cguErrorElement.classList.add("error-message");
      isFormValid = false;
    }

    if (isFormValid) {
      modalBody.innerHTML = "<h2> Votre inscription est confirmée </h2>";
    }
  });
}
validateForm();
