export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._closeButtonPopup = this._popup.querySelector('.popup__closebutton');
    this._handlePressEsc = this._handlePressEsc.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
    this._handlePressEnter = this._handlePressEnter.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handlePressEsc);
    document.addEventListener('keyup', this._handlePressEnter);
    document.addEventListener('click', this._handleClickOverlay);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keyup', this._handlePressEsc);
    document.addEventListener('keyup', this._handlePressEnter);
    document.addEventListener('click', this._handleClickOverlay);
  }

  _handlePressEsc(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _handlePressEnter(event) {
    if (event.key === 'Enter') {
      this.closePopup();
    }
  }
  _handleClickOverlay(event) {
    if (event.target.classList.contains('popup')) {
      this.closePopup();
    }
  };

  trackEventListener() {
    this._popup.addEventListener('click', this._handleClickOverlay.bind(this));
    this._closeButtonPopup.addEventListener('click', () => this.closePopup());
  }
};