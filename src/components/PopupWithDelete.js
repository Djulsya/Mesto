import Popup from '../components/Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._deleteButton = document.querySelector(".popup__savebutton-deletephoto");
    this._handleSubmitCallback = handleSubmitCallback;
  }

  openPopup(call) { // замена call
    super.open();
    this.call = call;
    this._deleteButton.onclick = this.call;
  }

  trackEventListener() {
    super.trackEventListener();
    this._deleteButton.addEventListener('click', () => {
      this._handleSubmitCallback(this._card);
    });
  }

  setDeleteCard(card) {
    this._card = card;
  }

}





// import { Popup } from '../components/Popup.js';

// export class PopupWithDelete extends Popup {
//   constructor(popup) {
//     super(popup);
//     this._button = this._popup.querySelector('.popup__savebutton-deletephoto')
//     //this._callbackFormSubmit = callbackFormSubmit; // popupSubmitCallback
//   }

//   // setSubmit(data) {
//   //   this._handleFormSubmit = data;
//   // }

//   // setDeleteCard(card) {
//   //   this._card = card;
//   // }

//   // trackEventListener() {
//   //   super.trackEventListener();
//   //   this._button.addEventListener('submit', (evt) => { //this._popup
//   //     evt.preventDefault();
//   //     this._handleFormSubmit(); //this._callbackFormSubmit(this._card)  //this._handleFormSubmit();
//   //   });
//   // }
// }