export const cardConfig = {
  templateCardSelector: '.card-template',
  cardSelector: '.card',
  cardImageSelector: '.card__img',
  cardCitySelector: '.card__city',
  cardLikeButtonSelector: '.card__like-button',
  cardLikeButtonActiveSelector: 'card__like-button_active',
  cardLikeCounterSelector: '.card__likes-counter',
  cardDeleteButtonSelector: '.card__delete-button'
};

export const popupConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  openPopupSelector: 'popup_opened',
  closePopupSelector: '.popup__close',
  popupImagePictureSelector: '.popup-image__picture',
  popupImageCitySelector: '.popup-image__city',
  popupButtonSaveSelector: '.popup__button-save'
};

export const cards = document.querySelector('.cards');
export const avatarEditButton = document.querySelector('.profile__photo');
export const avatarEditMark = document.querySelector('.profile__avatar-edit')
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const confirmButton = document.querySelector('.popup__button-confirm');
export const handleResponce = res => {if (res.ok) {return res.json()} return Promise.reject(`Error: ${res.status}`);}