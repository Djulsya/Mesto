import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._albumPhoto = this._popup.querySelector('.popup__photo-openphoto');
    this._albumElementsInfo = this._popup.querySelector('.popup__photo-info');
  };

  openPopup(link, alt) {
    this._albumPhoto.src = link;
    this._albumPhoto.alt = alt;
    this._albumElementsInfo.textContent = alt;
    super.openPopup();
  };
};
