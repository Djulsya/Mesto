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
    api.deleteCard(item.getId())
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
  api.likeCard(item.getId())
    .then((data) => {
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleDeleteLikeCard(item) {
  api.unlikeCard(item.getId())
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
      handleCardClick: (name, link) => {
        popupOpenPhoto.openPopup(name, link);
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
      popupEditForm.renderLoading(true);
      api.updateUserInfo({
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
          popupEditForm.renderLoading(false);
        })
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
    handleSubmitCallback: (input) => {
      cardEditForm.renderLoading(true);
      api.createCard({ name: input.title, link: input.link })
        .then((data) => {
          cardList.addItems
            (createNewCard(
              { name: data.title, link: data.link, owner: { _id: userId }, likes: data.likes, _id: data._id }
            ));
        })
        .then(() => cardEditForm.closePopup())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          cardEditForm.renderLoading(false);
        })
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
      avatarEditForm.renderLoading(true);
      api.updateUserAvatar({
        avatar: data.link
      })
        .then((info) => {
          editProfileInfo.setUserAvatar(info.avatar);
          avatarEditForm.closePopup()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          avatarEditForm.renderLoading(false);
        })
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

Promise.all([api.getInfo(), api.getInitialCards()])
  .then((data) => {
    userId = data[0]._id;
    editProfileInfo.setUserInfo({
      name: data[0].name,
      about: data[0].about,
      avatar: data[0].avatar,
    });
    cardList = new Section(
      {
        item: data[1],
        renderer: (item) => {
          cardList.addItems(createNewCard(item));
        },
      },
      ".album__elements"
    );
    cardList.renderItems();
  })
  .catch((err) => console.error(err)); 