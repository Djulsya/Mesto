import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._albumPhoto = this._popup.querySelector('.popup__photo-openphoto'); //изображение попапа
    this._albumElementsInfo = this._popup.querySelector('.popup__photo-info'); //текст попапа
  }

  openPopup(name, link) {
    this._albumPhoto.setAttribute("alt", name);
    this._albumPhoto.setAttribute("src", link);
    this._albumElementsInfo.textContent = name;
    super.openPopup();
  };
};
