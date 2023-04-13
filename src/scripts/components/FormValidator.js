export class FormValidator {
  constructor(enableValidationConfig, formElement) {
    this._formElement = formElement;
    this._enableValidationConfig = enableValidationConfig;
    this._inputSelector = enableValidationConfig.inputSelector;
    this._inputErrorClass = enableValidationConfig.inputErrorClass;
    this._inactiveButtonClass = enableValidationConfig.inactiveButtonClass;
    this._submitButtonSelector = enableValidationConfig.submitButtonSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._enableValidationConfig.inputSelector));
    this._submitSaveButton = this._formElement.querySelector(this._enableValidationConfig.submitButtonSelector);
  };

  _hasErrorInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleSaveButton() {
    if (this._hasErrorInput() === true) {
      this._submitSaveButton.classList.add(this._enableValidationConfig.inactiveButtonClass);
      this._submitSaveButton.disabled = true;
    } else {
      this._submitSaveButton.classList.remove(this._enableValidationConfig.inactiveButtonClass);
      this._submitSaveButton.disabled = false;
    };
  };

  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
    inputElement.classList.add(this._enableValidationConfig.inputErrorClass);
    errorElement.textContent = validationMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
    inputElement.classList.remove(this._enableValidationConfig.inputErrorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _trackEventListener() {
    this._toggleSaveButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleSaveButton();
      });
    });
  };

  checkValidation() {
    this._toggleSaveButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  enableValidation() {
    this._trackEventListener();
  };
};