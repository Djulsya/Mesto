import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

 const profileEditPopup = document.querySelector('.profile-popup');
 const getName = document.querySelector('.profile__name');
 const getAbout = document.querySelector('.profile__about');
 const getAvatar = document.querySelector('.profile__avatar');
 const editForm = document.querySelector('.popup__container');
 const nameInput = editForm.querySelector('.popup__input_type_name');
 const aboutInput = editForm.querySelector('.popup__input_type_about');
 const popupPhoto = document.querySelector('.popup-addphoto');
 const elementsAlbum = document.querySelector('.album__elements');
 const albumSection = document.querySelector('.popup-openphoto');
 const templateElement = document.querySelector('#template-element').content;

 const closeButtons = document.querySelectorAll('.popup__close');
 const buttonEditProfileClose = document.querySelector('.popup__closebutton');
 const profileEditForm = document.querySelector('.popup__editprofile');
 const editFormPhoto = document.querySelector('.popup__container-addphoto');
 const buttonAddPhotoClose = document.querySelector('.popup__closebutton-addphoto');
 const albumPhoto = document.querySelector('.popup__photo-openphoto');
 const albumElementsInfo = albumSection.querySelector('.popup__photo-info');
 const buttonElementsAlbumClose = albumSection.querySelector('.popup__closebutton-photo');
 const popupAddphoto = document.querySelector('.popup-addphoto');
 const editFormAddPhoto = popupAddphoto.querySelector('.popup__editprofile-addphoto');
 const titleInput = popupAddphoto.querySelector('.popup__input-addphoto_type_title');
 const linkInput = popupAddphoto.querySelector('.popup__input-addphoto_type_link');
 const elementPhoto = document.querySelector('.element__photo');

const buttonEditProfileOpen = document.querySelector('.profile__editbutton'); //popupProfileOpenButton
const buttonAddPhotoOpen = document.querySelector('.profile__addbutton') // popUpAdd
const buttonUpdateAvatar = document.querySelector('.profile__avatar-editbutton'); // avatarPen
const buttonAddPhotoSave = document.querySelector('.popup__savebutton-addphoto'); // submitButtonAdd
const buttonEditProfileSave = document.querySelector('.popup__savebutton-profile'); // submitButtonProfile // .popup__savebutton
const buttoEditAvatarSave = document.querySelector('.popup__savebutton-editavatar'); // submitButtonAvatar

const popupProfileFormElement = document.querySelector(".popup__editprofile-data"); //форма попапа редактирования
const cardsForm = document.querySelector(".popup__editprofile-addphoto"); //форма карточек
const avatarForm = document.querySelector(".popup__editprofile-editavatar"); // форма аватара

// element__button-like

const enableValidationConfig = { // validationConfig
  formSelector: '.popup__editprofile',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_error',
  inputErrorClass: 'popup__input-errorline',
};

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '813a52a6-fb30-422d-b79d-9de8b1db1ade',
    'Content-Type': 'application/json'
  },
}

const api = new Api(apiConfig);
let cardList;

// функция удаления карточек
function handleDeleteCard(item) {

  popupTrash.openPopup(() => {
    api
      .getDeleteCard(item.getId())
      .then(() => {
        item.remove();
        popupTrash.closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// функция добавления лайка
function handleLikeCard(item) {
  api
    .getLike(item.getId())
    .then((data) => {
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// функция удаления лайка
function handleDeleteLikeCard(item) {
  api
    .getDeleteLike(item.getId())
    .then((data) => {
      item.toggleLikeCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const validationAddPhotoPopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile-addphoto"]'));
validationAddPhotoPopup.enableValidation();

const validationProfilePopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile"]'));// 
validationProfilePopup.enableValidation();

const validationAvatarPopup = new FormValidator(enableValidationConfig, document.querySelector('[name="editprofile-editavatar"]')); // 
validationAvatarPopup.enableValidation(); //popUpAvatarValidation

// получаем начальный набор карточек
  
const elementaryCards = api
  .getInitialCards()
  .then(function (data) {
    cardList = new Section(
      {
        item: data, // переворачивем массив, чтобы карточки добавлялись в начало // elem: data.reverse()
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

// функция для создания новой карточки
function createNewCard(item) { 
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: (name, link) => {
        popupOpenPhoto.openPopup(name, link);
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
}
// попап редактирования профиля //создание экземпляра PopupWithForm
const popupEditForm = new PopupWithForm( // newProfilePopup
  {
    handleSubmitCallback: (data) => {
      api
        .getUserInfoEdit({
          name: data.name,
          about: data.about,
        })
        .then(() => {
          editProfileInfo.setUserInfo({
            name: data.name,
            about: data.about,
          });
        })
        .then(() => popupEditForm.closePopup())
        // .then(() => {
        //   //validationProfilePopup.inactiveButton(), // popUpProfileValidation // disabledButton
        //   //validationProfilePopup.checkValidation();
        // })
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
  nameInput.value = editProfileInfo.getUserInfo().name;
  aboutInput.value = editProfileInfo.getUserInfo().about;
});

// навешиваем слушатель на кнопку
// buttonEditProfileOpen.addEventListener("click", function () {  // popupProfileOpenButton
//   popupEditForm.openPopup();
//   popupEditForm.setInputValues(editProfileInfo.getUserInfo());
// });

// попап добавления карточек
const cardEditForm = new PopupWithForm( // newCardPopup
  {
    handleSubmitCallback: (item) => {
      api
        .getNewCard({ name: item.image, link: item.link })
        .then((data) => {
          cardList.addItems(
            createNewCard({
              name: data.name,
              link: data.link,
              owner: { _id: userId },
              likes: data.likes,
              _id: data._id
            })
          );
        })
         .then(() => cardEditForm.closePopup())
        //   //validationAddPhotoPopup.checkValidation(),
        //   //validationAddPhotoPopup.inactiveButton()
         
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
cardEditForm.trackEventListener(); // создаются карточки
buttonAddPhotoOpen.addEventListener('click', () => {
  cardEditForm.openPopup();
  validationAddPhotoPopup.checkValidation();
});
// навешиваем слушатель на кнопку
// buttonAddPhotoOpen.addEventListener("click", () => {
//   cardEditForm.openPopup();
// });

// попап аватара
const avatarEditForm = new PopupWithForm( // popupAvatar
  {
    handleSubmitCallback: (data) => {
      api
        .getEditAvatar({ avatar: data.avatar }) // это метод класса Api
        .then((info) => {
          editProfileInfo.setAvatarInfo({ link: info.avatar }); // это метод из класса UserInfo. profilePopup - экземпляр класса UserInfo
        })
         .then(() => { avatarEditForm.closePopup() })
        //   //validationAvatarPopup.checkValidation(),
        //   //validationAvatarPopup.inactiveButton();
         
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

// // навешиваем слушатель на кнопку
// buttonUpdateAvatar.addEventListener("click", () => {
//   avatarEditForm.openPopup();
// });

//попап  с картинкой
const popupOpenPhoto = new PopupWithImage(".popup-openphoto");
popupOpenPhoto.trackEventListener();

const editProfileInfo = new UserInfo({ name: getName, about: getAbout, avatar: getAvatar }); // profilePopup

// попап удаления
const popupTrash = new PopupWithDelete(".popup-deletephoto");
popupTrash.trackEventListener();

// данные пользователя
let userId; // изменяю значение ниже, поэтому не могу обьявить константу
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


