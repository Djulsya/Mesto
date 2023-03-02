const enableValidationConfig = {
  formSelector: '.popup__editprofile',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_error',
  inputErrorClass: 'popup__input-errorline',
};

// 1. изменение кнопки
function toggleSaveButton(button, active, config) {
  if (active) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}
// 1. изменение кнопки 

// 2. показать, скрыть, проверить
function showInputError(formElement, inputElement, validationMessage, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = validationMessage;
};

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
// 2. показать, скрыть, проверить

// 3. обработка полей и форм
function trackEventListener(formElement, config) {
  const submitSaveButton = formElement.querySelector(config.submitButtonSelector);
  const inputPopup = formElement.querySelectorAll(config.inputSelector);
  inputPopup.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleSaveButton(submitSaveButton, formElement.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const editForm = document.querySelectorAll(config.formSelector);
  editForm.forEach((formElement) => {
    trackEventListener(formElement, config);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const submitSaveButton = formElement.querySelector(config.submitButtonSelector);
    toggleSaveButton(submitSaveButton, formElement.checkValidity(), config);
  });
}
enableValidation(enableValidationConfig);
// 3. обработка полей и форм
