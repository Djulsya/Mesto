import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const getName = document.querySelector('.profile__name');
const getAbout = document.querySelector('.profile__about');
const getAvatar = document.querySelector('.profile__avatar');

const buttonEditProfileOpen = document.querySelector('.profile__editbutton');
const buttonAddPhotoOpen = document.querySelector('.profile__addbutton');
const buttonUpdateAvatar = document.querySelector('.profile__avatar-editbutton');
const buttonAddPhotoSave = document.querySelector('.popup__savebutton-addphoto');
const buttonEditProfileSave = document.querySelector('.popup__savebutton-profile');
const buttoEditAvatarSave = document.querySelector('.popup__savebutton-editavatar');

const enableValidationConfig = {
  formSelector: '.popup__editprofile',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_error',
  inputErrorClass: 'popup__input-errorline',
};

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '813a52a6-fb30-422d-b79d-9de8b1db1ade',
    'Content-Type': 'application/json'
  },
};

const api = new Api(apiConfig);
let cardList;
let userId;

function handleDeleteCard(item) {
  popupDeletePhoto.openPopup(() => {
    api.getDeleteCard(item.getId())
      .then(() => {
        item.remove();
        popupDeletePhoto.closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

function handleLikeCard(item) {
  api.getLike(item.getId())
    .then((data) => {
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleDeleteLikeCard(item) {
  api.getDeleteLike(item.getId())
    .then((data) => {
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const validationAddPhotoPopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile-addphoto"]'));
validationAddPhotoPopup.enableValidation();

const validationProfilePopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile"]'));
validationProfilePopup.enableValidation();

const validationAvatarPopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile-editavatar"]'));
validationAvatarPopup.enableValidation();

const elementaryCards = api
  .getInitialCards()
  .then(function (data) {
    cardList = new Section(
      {
        item: data,
        renderer: (item) => {
          cardList.addItems(createNewCard(item));
        },
      },
      ".album__elements"
    );
  })
  .catch((err) => {
    console.log(err);
  });

function createNewCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: (title, link) => {
        popupOpenPhoto.openPopup(title, link);
        popupOpenPhoto.trackEventListener();
      },
      handleDeleteCard,
      handleLikeCard,
      handleDeleteLikeCard,
    },
    "#template-element"
  );
  const cardTemplate = card.generateCard();
  return cardTemplate;
};

const popupEditForm = new PopupWithForm(
  {
    handleSubmitCallback: (data) => {
      api.getUserInfoEdit({
        name: data.name,
        about: data.about,
      })
        .then(() => {
          editProfileInfo.setUserInfo({
            name: data.name,
            about: data.about,
          });
        })
        .then(() => popupEditForm.closePopup()
        )
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonEditProfileSave.textContent = "Сохранить";
        });
    },
  },
  ".profile-popup"
);
popupEditForm.trackEventListener();
buttonEditProfileOpen.addEventListener('click', () => {
  popupEditForm.openPopup();
  validationProfilePopup.checkValidation();
  popupEditForm.setInputValues(editProfileInfo.getUserInfo());
});

const cardEditForm = new PopupWithForm(
  {
    handleSubmitCallback: (item) => {
      api.getNewCard({ name: item.title, link: item.link })
        .then((data) => {
          cardList.addItems
            (createNewCard(
              { title: data.title, link: data.link, owner: { _id: userId }, likes: data.likes, _id: data._id }
            ));
        })
        .then(() => cardEditForm.closePopup())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonAddPhotoSave.textContent = "Создать";
        });
    },
  },
  ".popup-addphoto"
);
cardEditForm.trackEventListener();
buttonAddPhotoOpen.addEventListener('click', () => {
  cardEditForm.openPopup();
  validationAddPhotoPopup.checkValidation();
});

const avatarEditForm = new PopupWithForm(
  {
    handleSubmitCallback: (data) => {
      api.getEditAvatar({
        avatar: data.link
      })
        .then((info) => {
          editProfileInfo.setUserAvatar(info.avatar);
          avatarEditForm.closePopup()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          buttoEditAvatarSave.textContent = "Сохранить";
        });
    },
  },
  ".popup-editavatar"
);

avatarEditForm.trackEventListener();
buttonUpdateAvatar.addEventListener('click', () => {
  avatarEditForm.openPopup();
  validationAvatarPopup.checkValidation();
});

const popupOpenPhoto = new PopupWithImage(".popup-openphoto");
popupOpenPhoto.trackEventListener();

const editProfileInfo = new UserInfo({ name: getName, about: getAbout, avatar: getAvatar });

const popupDeletePhoto = new PopupWithDelete(".popup-deletephoto");
popupDeletePhoto.trackEventListener();

const userInfo = api
  .getInfo()
  .then((data) => {
    userId = data._id;
    editProfileInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([userInfo, elementaryCards])
  .then(() => cardList.asd())
  .catch(err => console.error(err));






//const albumSection = document.querySelector('.popup-openphoto');
//const popupAddphoto = document.querySelector('.popup-addphoto');
// const profileEditPopup = document.querySelector('.profile-popup');
// const editForm = document.querySelector('.profile__content');
// const nameInput = editForm.querySelector('.popup__input_type_name');
// const aboutInput = editForm.querySelector('.popup__input_type_about');
// const avatarInput = editForm.querySelector('.popup__input_type_avatar');
// const popupPhoto = document.querySelector('.popup-addphoto');
// const elementsAlbum = document.querySelector('.album__elements');
// const templateElement = document.querySelector('#template-element').content;
// const closeButtons = document.querySelectorAll('.popup__close');
// const buttonEditProfileClose = document.querySelector('.popup__closebutton');
// const profileEditForm = document.querySelector('.popup__editprofile');
// const editFormPhoto = document.querySelector('.popup__container-addphoto');
// const buttonAddPhotoClose = document.querySelector('.popup__closebutton-addphoto');
// const albumPhoto = document.querySelector('.popup__photo-openphoto');
// const albumElementsInfo = albumSection.querySelector('.popup__photo-info');
// const buttonElementsAlbumClose = albumSection.querySelector('.popup__closebutton-photo');
// const editFormAddPhoto = popupAddphoto.querySelector('.popup__editprofile-addphoto');
// const titleInput = popupAddphoto.querySelector('.popup__input-addphoto_type_title');
// const linkInput = popupAddphoto.querySelector('.popup__input-addphoto_type_link');
// const elementPhoto = document.querySelector('.element__photo');
// const popupProfileFormElement = document.querySelector(".popup__editprofile-data");
// const cardsForm = document.querySelector(".popup__editprofile-addphoto");
// const avatarForm = document.querySelector(".popup__editprofile-editavatar");