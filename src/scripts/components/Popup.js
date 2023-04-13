export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButtonPopup = this._popup.querySelector('.popup__closebutton');
    this._handlePressEsc = this._handlePressEsc.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
  };

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handlePressEsc);
    document.addEventListener('click', this._handleClickOverlay);
  };

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handlePressEsc);
    document.removeEventListener('click', this._handleClickOverlay);
  };

  _handlePressEsc(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    };
  };

  _handleClickOverlay(event) {
    if (event.target.classList.contains('popup')) {
      this.closePopup();
    };
  };

  trackEventListener() {
    this._popup.addEventListener('click', this._handleClickOverlay);
    this._closeButtonPopup.addEventListener('click', () => this.closePopup());
  };
};

