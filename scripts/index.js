
//окно редактирования профиля
let popup = document.querySelector('.popup');
let buttonEditProfileOpen = document.querySelector('.profile__editbutton');
let editForm = document.querySelector('.popup__container');
let getName = document.querySelector('.profile__name');
let getAbout = document.querySelector('.profile__about');
let nameInput = editForm.querySelector('.popup__input_type_name');
let aboutInput = editForm.querySelector('.popup__input_type_about');
let buttonEditProfileSave = document.querySelector('.popup__savebutton');
let buttonEditProfileClose = document.querySelector('.popup__closebutton');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  aboutInput.value = getAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = `${nameInput.value}`;
  getAbout.textContent = `${aboutInput.value}`;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonEditProfileOpen.addEventListener('click', openPopup);
editForm.addEventListener('submit', formSubmitHandler);
buttonEditProfileClose.addEventListener('click', closePopup);

//окно добавления фотокарточки
let popupPhoto = document.querySelector('.popup-addphoto');
let buttonAddPhotoOpen = document.querySelector('.profile__addbutton');
let editFormPhoto = document.querySelector('.popup__container-addphoto');
// let titleInput = editFormPhoto.querySelector('.popup__input-addphoto_type_title');
// let linkInput = editFormPhoto.querySelector('.popup__input-addphoto_type_link');
let buttonAddPhotoSave = document.querySelector('.popup__savebutton-addphoto');
let buttonAddPhotoClose = document.querySelector('.popup__closebutton-addphoto');

function openPopupPhoto() {
  popupPhoto.classList.add('popup_opened');
  // titleInput.value = getTitle.textContent;
  // linkInput.value = getLink.textContent;
}

function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened');
}

buttonAddPhotoOpen.addEventListener('click', openPopupPhoto);
buttonAddPhotoSave.addEventListener('click', closePopupPhoto);
editFormPhoto.addEventListener('submit', formSubmitHandler);
buttonAddPhotoClose.addEventListener('click', closePopupPhoto);

//АКТИВНЫЙ ЛАЙК НО ОДИН
let buttonElement = document.querySelector('.element__button');

function toggleLike() {
  buttonElement.classList.toggle('element__button_active');
}

buttonElement.addEventListener('click', toggleLike);


///карточки
const initialCards = [
  {
    name: 'Detroit, papaver',
    link: 'https://images.unsplash.com/photo-1589720061712-10b534c7218e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Vietnam, nymphaea',
    link: 'https://images.unsplash.com/photo-1560741232-886afab774be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    name: 'Sri-Lanka, alocasia',
    link: 'https://images.unsplash.com/photo-1547070078-442aa97f595a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'UK New-Forest, nephrolepis and horse',
    link: 'https://images.unsplash.com/photo-1627649121950-116ee520fc21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Altai Republic, dahlia',
    link: 'https://images.unsplash.com/photo-1631100615885-16e05606aa11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'NY, caladium',
    link: 'https://images.unsplash.com/photo-1596670616944-60db8c2a24f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  }
];






















