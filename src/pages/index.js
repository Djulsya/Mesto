import '../pages/index.css';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const profilePopup = document.querySelector('.profile-popup');
const buttonEditProfileOpen = document.querySelector('.profile__editbutton');
const getName = document.querySelector('.profile__name');
const getAbout = document.querySelector('.profile__about');
const editForm = document.querySelector('.popup__container');
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');

const popupPhoto = document.querySelector('.popup-addphoto');
const buttonAddPhotoOpen = document.querySelector('.profile__addbutton');

const elementsAlbum = document.querySelector('.album__elements');
const albumSection = document.querySelector('.popup-openphoto');
const templateElement = document.querySelector('#template-element').content;
const initialCards = [
  {
    title: 'NY, caladium',
    link: 'https://images.unsplash.com/photo-1596670616944-60db8c2a24f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  },
  {
    title: 'Altai Republic, dahlia',
    link: 'https://images.unsplash.com/photo-1631100615885-16e05606aa11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    title: 'UK, Nephrolepis and horse',
    link: 'https://images.unsplash.com/photo-1627649121950-116ee520fc21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80'
  },
  {
    title: 'Sri-Lanka, alocasia',
    link: 'https://images.unsplash.com/photo-1547070078-442aa97f595a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Vietnam, nymphaea',
    link: 'https://images.unsplash.com/photo-1560741232-886afab774be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    title: 'Detroit, papaver',
    link: 'https://images.unsplash.com/photo-1589720061712-10b534c7218e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  }
];

const enableValidationConfig = {
  formSelector: '.popup__editprofile',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_error',
  inputErrorClass: 'popup__input-errorline',
};

function handleCardClick(alt, link) {
  popupOpenPhoto.openPopup(alt, link);
  popupOpenPhoto.trackEventListener();
};

function createCard(item) {
  const cardElement = new Card(item, templateElement, handleCardClick).createNewCard();
  return cardElement;
};

const validationAddPhotoPopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile-addphoto"]'));
validationAddPhotoPopup.enableValidation();

const validationProfilePopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile"]'));
validationProfilePopup.enableValidation();

const renderInitialCards = new Section({
  items: initialCards, renderer: (item) => { renderInitialCards.addItems(createCard(item)) }
},
  elementsAlbum);
renderInitialCards.renderItems();

const popupEditForm = new PopupWithForm(profilePopup, (profile) => {
  editProfileInfo.setUserInfo(profile);
});
popupEditForm.trackEventListener();
buttonEditProfileOpen.addEventListener('click', () => {
  popupEditForm.openPopup();
  validationProfilePopup.checkValidation();
  nameInput.value = editProfileInfo.getUserInfo().name;
  aboutInput.value = editProfileInfo.getUserInfo().about;
});

const cardEditForm = new PopupWithForm(popupPhoto, (card) => {
  renderInitialCards.addItems(createCard(card));
});
cardEditForm.trackEventListener();
buttonAddPhotoOpen.addEventListener('click', () => {
  cardEditForm.openPopup();
  validationAddPhotoPopup.checkValidation();
});

const popupOpenPhoto = new PopupWithImage(albumSection);

const editProfileInfo = new UserInfo({ name: getName, about: getAbout });

// const closeButtons = document.querySelectorAll('.popup__close');
// const buttonEditProfileSave = document.querySelector('.popup__savebutton');
// const buttonEditProfileClose = document.querySelector('.popup__closebutton');
// const profileEditForm = document.querySelector('.popup__editprofile');
// const editFormPhoto = document.querySelector('.popup__container-addphoto');
// const buttonAddPhotoSave = document.querySelector('.popup__savebutton-addphoto');
// const buttonAddPhotoClose = document.querySelector('.popup__closebutton-addphoto');
// const albumPhoto = querySelector('.popup__photo-openphoto');
// const albumElementsInfo = albumSection.querySelector('.popup__photo-info');
// const buttonElementsAlbumClose = albumSection.querySelector('.popup__closebutton-photo');
// const popupAddphoto = document.querySelector('.popup-addphoto');
// const editFormAddPhoto = popupAddphoto.querySelector('.popup__editprofile-addphoto');
// const titleInput = popupAddphoto.querySelector('.popup__input-addphoto_type_title');
// const linkInput = popupAddphoto.querySelector('.popup__input-addphoto_type_link');
// const elementPhoto = document.querySelector('.element__photo');