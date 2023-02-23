// 1.1 окно редактирования профиля
const popup = document.querySelector('.popup');
const buttonEditProfileOpen = document.querySelector('.profile__editbutton');
const getName = document.querySelector('.profile__name');
const getAbout = document.querySelector('.profile__about');
const editForm = document.querySelector('.popup__container');
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');
const buttonEditProfileSave = document.querySelector('.popup__savebutton');
const buttonEditProfileClose = document.querySelector('.popup__closebutton');
// 1.1 окно редактирования профиля

// 2.1 окно добавления фотокарточки
const popupPhoto = document.querySelector('.popup-addphoto');
const buttonAddPhotoOpen = document.querySelector('.profile__addbutton');
const editFormPhoto = document.querySelector('.popup__container-addphoto');
const buttonAddPhotoSave = document.querySelector('.popup__savebutton-addphoto');
const buttonAddPhotoClose = document.querySelector('.popup__closebutton-addphoto');
// 2.1 окно добавления фотокарточки 


// 3.1 карточки 
const elementsAlbum = document.querySelector('.album__elements');
const albumSection = document.querySelector('.popup__openphoto');
const albumPhoto = albumSection.querySelector('.popup__photo-openphoto');
const albumElementsInfo = albumSection.querySelector('.popup__photo-info');
const buttonElementsAlbumClose = albumSection.querySelector('.popup__closebutton-photo');
const popupAddphoto = document.querySelector('.popup-addphoto');
const editFormAddPhoto = popupAddphoto.querySelector('.popup__editprofile-addphoto');
const titleInput = popupAddphoto.querySelector('.popup__input-addphoto_type_title');
const linkInput = popupAddphoto.querySelector('.popup__input-addphoto_type_link');
const initialCards = [
  {
    name: 'NY, caladium',
    link: 'https://images.unsplash.com/photo-1596670616944-60db8c2a24f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  },
  {
    name: 'Altai Republic, dahlia',
    link: 'https://images.unsplash.com/photo-1631100615885-16e05606aa11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'UK New-Forest, nephrolepis and horse',
    link: 'https://images.unsplash.com/photo-1627649121950-116ee520fc21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Sri-Lanka, alocasia',
    link: 'https://images.unsplash.com/photo-1547070078-442aa97f595a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Vietnam, nymphaea',
    link: 'https://images.unsplash.com/photo-1560741232-886afab774be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    name: 'Detroit, papaver',
    link: 'https://images.unsplash.com/photo-1589720061712-10b534c7218e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  }
];
// 3.1 карточки 

// 1.2 окно редактирования профиля 
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
// 1.2 окно редактирования профиля 

// 2.2 окно добавления фотокарточки 
function openPopupPhoto() {
  popupPhoto.classList.add('popup_opened');
}

function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened');
}
// 2.2 окно добавления фотокарточки

// 3.2 карточки 
function expandPopupPhoto() {
  albumSection.classList.add('popup_opened');
}

function turnPopupPhoto() {
  albumSection.classList.remove('popup_opened');
}

function getLikeActive(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function getDeleteElement(evt) {
  evt.target.closest('.element').remove();
}

function getExpandPhoto(link, alt) {
  albumPhoto.src = link;
  albumPhoto.alt = alt;
  albumElementsInfo.textContent = alt;
  expandPopupPhoto(albumSection);
}

function createCardBox(item) {
  const templateElement = document.querySelector('#template-element').content;
  const createElement = templateElement.querySelector('.element').cloneNode(true);
  const elementButtonDelete = createElement.querySelector('.element__button-delete');
  const elementPhoto = createElement.querySelector('.element__photo');
  const elementText = createElement.querySelector('.element__text');
  const elementButtonLike = createElement.querySelector('.element__button-like');
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;
  elementText.textContent = item.name;
  elementButtonDelete.addEventListener('click', getDeleteElement);
  elementPhoto.addEventListener('click', () => getExpandPhoto(item.link, item.name));
  elementButtonLike.addEventListener('click', getLikeActive);
  return createElement;
}

function createAddCard(evt) {
  evt.preventDefault();
  const newElement = createCardBox({ name: titleInput.value, link: linkInput.value });
  elementsAlbum.prepend(newElement);
  closePopup(popupAddphoto);
  editFormAddPhoto.reset();
}

function createExpandPhoto() {
  const expandPhoto = initialCards.map(item => {
    const createElement = createCardBox(item);
    return createElement;
  });
  elementsAlbum.append(...expandPhoto);
}
createExpandPhoto();
// 3.2 карточки

// 1.3 окно редактирования профиля
buttonEditProfileOpen.addEventListener('click', openPopup);
editForm.addEventListener('submit', formSubmitHandler);
buttonEditProfileClose.addEventListener('click', closePopup);
// 1.3 окно редактирования профиля

// 2.3 окно добавления фотокарточки
buttonAddPhotoOpen.addEventListener('click', openPopupPhoto);
buttonAddPhotoSave.addEventListener('click', closePopupPhoto);
editFormPhoto.addEventListener('submit', formSubmitHandler);
buttonAddPhotoClose.addEventListener('click', closePopupPhoto);
// 2.3 окно добавления фотокарточки

// 3.3 карточки
buttonElementsAlbumClose.addEventListener('click', turnPopupPhoto);
editFormAddPhoto.addEventListener('submit', createAddCard);
// 3.3 карточки
