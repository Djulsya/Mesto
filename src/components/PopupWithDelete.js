import Popup from '../components/Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._deleteButton = document.querySelector(".popup__savebutton-deletephoto");
    this._handleSubmitCallback = handleSubmitCallback;
  };

  openPopup(open) {
    super.openPopup();
    this.open = open;
    this._deleteButton.onclick = this.open;
  };

  trackEventListener() {
    super.trackEventListener();
    this._deleteButton.addEventListener('click', () => {
      this.closePopup();
    });
  };

  setDeleteCard(card) {
    this._card = card;
  };
}
