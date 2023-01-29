let popup = document.querySelector('.popup');
let buttonEditProfileOpen = document.querySelector('.profile__editbutton');
let editForm = document.querySelector('.popup__container');
let getName = document.querySelector('.profile__name');
let getAbout = document.querySelector('.profile__about');
let nameInput = editForm.querySelector('.popup__editform_name');
let aboutInput = editForm.querySelector('.popup__editform_about');
let buttonEditProfileSave = document.querySelector('.popup__savebutton');
let buttonEditProfileClose = document.querySelector('.popup__closebutton');

function openPopup() {
  popup.classList.add('popup__opened');
  nameInput.value = getName.textContent;
  aboutInput.value = getAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  getName.textContent = `${nameInput.value}`;
  getAbout.textContent = `${aboutInput.value}`;
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

buttonEditProfileOpen.addEventListener('click', openPopup);
editForm.addEventListener('submit', formSubmitHandler);
buttonEditProfileSave.addEventListener('click', closePopup);
buttonEditProfileClose.addEventListener('click', closePopup);