import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitCallback }, popupSelector, enableValidationConfig) {
    super(popupSelector, enableValidationConfig);
    this._handleSubmitCallback = handleSubmitCallback;
    this._formPopup = this._popup.querySelector('.popup__editprofile');
    this._formInputs = Array.from(this._formPopup.querySelectorAll('.popup__input'));
    this._popupButtonSave = this._popup.querySelector('.popup__savebutton');
    this._buttonText = this._popupButtonSave.textContent;
  };

  closePopup() {
    super.closePopup();
    this._formPopup.reset();
  };

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  };

  _getInputValues() {
    this._inputsValues = {};
    this._formInputs.forEach(input => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  };

   renderLoading(isLoading) {
     if(isLoading) {
       this._popupButtonSave.textContent = 'Сохранение...';
       this._popupButtonSave.disabled = true;
     } else {
       this._popupButtonSave.textContent = this._buttonText;
       this._popupButtonSave.disabled = false;
     }
   }

  trackEventListener() {
    super.trackEventListener();
    this._formPopup.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading();
      this._handleSubmitCallback(this._getInputValues());
    });
  };
}


