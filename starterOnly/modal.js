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

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

document.addEventListener("click", function(event) {
  if (event.target == modalbg || event.target.classList.contains("close")) {
    closeModal();
  }
});

// form Validation
const validateForm = function () {
  const form = document.getElementById("form");
  const nameErrorMessage = "Veuillez entrer 2 caractères ou plus."
  const emailErrorMessage = "Veuillez entrer une adresse email valide."
  const quantityErrorMessage = "Veuillez entrer un nombre entier positif."

  const validateInput = function (inputElement, regex, errorMessage, fieldName) {
    const inputValue = inputElement.value.trim();
    const isValid = regex.test(inputValue);
    const errorMessageElement = inputElement.nextElementSibling;
    if (isValid) {
      errorMessageElement.innerHTML = "";
      inputElement.classList.add("success");
      errorMessageElement.classList.remove("error-message");
      inputElement.classList.remove("has-error");
      return true;
    } else {
      errorMessageElement.innerHTML = `${errorMessage}`;
      errorMessageElement.classList.add("error-message");
      inputElement.classList.remove("success");
      inputElement.classList.add("has-error");
      return false;
    }
  };

  form.first.addEventListener("change", function () {
    validateInput(this, /^[a-zA-Z\- ]{2,}$/, nameErrorMessage, "Prénom");
  });

  form.last.addEventListener("change", function () {
    validateInput(this, /^[a-zA-Z\- ]{2,}$/, nameErrorMessage, "Nom");
  });

  form.email.addEventListener("change", function () {
    validateInput(this, /^[^@]+@[^@]+\.[^@]+$/, emailErrorMessage, "Email");
  });

  form.quantity.addEventListener("change", function () {
    validateInput(this, /^[1-9]\d*$/, quantityErrorMessage, "Quantité");
  });

  form.addEventListener("submit", function (event) {
    const locationInputs = document.querySelectorAll('input[name="location"]');
    const termsCheckbox = document.getElementById("checkbox1");

    let locationSelected = false;
    for (let i = 0; i < locationInputs.length; i++) {
      if (locationInputs[i].checked) {
        locationSelected = true;
        break;
      }
    }

    if (!locationSelected) {
      event.preventDefault();
      const errorMessageElement = document.querySelector('.city-checkbox-error');
      errorMessageElement.innerHTML = "Vous devez choisir une option.";
      errorMessageElement.classList.add("error-message");
    }

    if (!termsCheckbox.checked) {
      event.preventDefault();
      const errorMessageElement = document.querySelector('.cgu-checkbox-error');
      errorMessageElement.innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
      errorMessageElement.classList.add("error-message");
    }
  });
};

validateForm();