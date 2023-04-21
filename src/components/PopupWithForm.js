import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitCallback }, popupSelector) { // handleFormSubmit
    super(popupSelector);
    this._handleSubmitCallback = handleSubmitCallback;  // handleFormSubmit
    // this._inputList = this._popup.querySelectorAll(".popup__input"); //inputList
    this._formPopup = this._popup.querySelector(".popup__editprofile"); // formList
    this._formInputs = Array.from(this._formPopup.querySelectorAll('.popup__input')); // inputList
    this._popupButtonSave = this._popup.querySelector(".popup__savebutton"); // submitButtonPopup
  }

  closePopup() {
    super.closePopup();
    this._formPopup.reset();
  }

  openPopup() {
    super.openPopup();
  }

  setInputValues(data) {
    this._formInputs.forEach((input) => {  
      input.value = data[input.name];
    });
  }

   _getInputValues() {
     this._inputInfo = {};
     this._formInputs.forEach((input) => { 
      this._inputInfo[input.name] = input.value 
    });
     return this._inputInfo;
   };

  // getInput() {
  //   return this._getInputValues();
  // }

  _startLoading() {
    this._popupButtonSave.textContent = "Сохранение...";
  }

  trackEventListener() {
    super.trackEventListener();
    this._formPopup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._startLoading(); 
      this._handleSubmitCallback(this._getInputValues());
    });
  }

  
  //  _getInputValues() {
  //    this._formElement = {};
  //    this._inputList.forEach((item) => (this._formElement[item.name] = item.value)
  //    );
  //    return this._formElement;
  //  }

  // setInputsValues(data) {
  //    this._newFormElement = {};
  //    data = Object.values(data);
  //    for (let like = 0; like < data.length; like++) {
  //      this._formInputs[like].value = data[like];
  //    }
  //  }

}



// import { Popup } from '../components/Popup.js';

// export class PopupWithForm extends Popup {
//   constructor(popup, editForm) {
//     super(popup);
//     this._editForm = editForm;
//     //this._callbackFormSubmit = callbackFormSubmit;  
//     this._formPopup = this._popup.querySelector('.popup__editprofile');
//     this._formInputs = Array.from(this._formPopup.querySelectorAll('.popup__input'));
    
//     this._saveButton = this._popup.querySelector('.popup__savebutton');
//     this._saveButtonLoading = this._saveButton.textContent;
//     this._saveButtonLoadingOn = 'Сохранение...';
//   };

//   // closePopup() {
//   //    super.closePopup();
//   //    this._formPopup.reset();
//   //  };

//   // _getInputValues() {
//   //   this._inputInfo = {};
//   //   this._formInputs.forEach((input) => { this._inputInfo[input.name] = input.value });
//   //   return this._inputInfo;
//   // };

//   // trackEventListener() {
//   //   super.trackEventListener();
//   //   this._formPopup.addEventListener('submit', (event) => {
//   //     event.preventDefault();
//   //     this._editForm(this._getInputValues()); // editForm
//   //     this.startLoading(); //
//   //     this.closePopup();
//   //   });
//   // };

//   // startLoading() { // !!
//   //   this._saveButton.disabled = true;
//   //   this._saveButton.textContent = this._saveButtonLoadingOn;
//   // }

//   // stopLoading() { // !!
//   //   this._saveButton.disabled = false;
//   //   this._saveButton.textContent = this._saveButtonLoading;
//   // }

//   // setInputValues(data) { // !!
//   //   this._formInputs.forEach((input) => {
//   //     input.value = data[input.name];
//   //   });
//   // }

// };

