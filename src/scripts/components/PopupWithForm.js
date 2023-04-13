import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popup, editForm) {
    super(popup);
    this._editForm = editForm;
    this._formPopup = this._popup.querySelector('.popup__editprofile');
    this._formInputs = Array.from(this._formPopup.querySelectorAll('.popup__input'));

    //9ПР
    //this._saveButton = this._popup.querySelector('.popup__savebutton');
    //this._saveButtonLoading = this._saveButtonLoading.textContent;
  };

  closePopup() {
    super.closePopup();
    this._formPopup.reset();
  };

  _getInputValues() {
    this._inputInfo = {};
    this._formInputs.forEach((input) => { this._inputInfo[input.name] = input.value });
    return this._inputInfo;
  };

  trackEventListener() {
    super.trackEventListener();
    this._formPopup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._editForm(this._getInputValues());
      this.closePopup();
    });
  };
};