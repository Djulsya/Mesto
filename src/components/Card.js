export default class Card {
  constructor({ data, userId, handleDeleteCard, handleDeleteLikeCard, handleLikeCard, handleCardClick }, templateSelector) {
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._id = data._id;
    this._owner = data.owner._id;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeCard = handleLikeCard;
    this.handleDeleteLikeCard = handleDeleteLikeCard;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  };

  generateCard() {
    this._element = this._getTemplate();
    this.cardTitle = this._element.querySelector(".element__text");
    this.cardImage = this._element.querySelector(".element__photo");
    this.cardLike = this._element.querySelector(".element__button-like");
    this.likeCounter = this._element.querySelector(".element__button-quantity");
    this.deletePhoto = this._element.querySelector(".element__button-delete");
    this.cardImage.src = this._link;
    this.cardImage.alt = this._title;
    this.cardTitle.textContent = this._title;
    this.likeCounter.textContent = this._likes.length;
    this._checkOwner();
    this._checkLikeOwner();
    this._trackEventListener();
    return this._element;
  };

  toggleLikeCard(data) {
    this._likes = data.likes;
    this.likeCounter.textContent = this._likes.length;
    this.cardLike.classList.toggle('element__button-like_active');
  };

   remove() {
     this._element.remove();
     this._element = null;
   };

  getId() {
    return this._data._id;
  };

  _checkOwner() {
    if (this._owner !== this._userId) {
      this.deletePhoto.classList.add('element__button-delete_on');
    };
  };

  _checkLikeOwner() {
    if (this._likes.some((user) => this._userId === user._id)) {
      this.cardLike.classList.add('element__button-like_active');
    };
  };

  _handleOpenImagePopup() {
    this.handleCardClick(this._title, this._link);
  };

  _trackEventListener() {
    this.cardLike.addEventListener("click", () => {
      if (this.cardLike.classList.contains('element__button-like_active')) {
        this.handleDeleteLikeCard(this);
      } else {
        this.handleLikeCard(this);
      }
    });
    this.deletePhoto.addEventListener("click", () => this.handleDeleteCard(this));
    this.cardImage.addEventListener("click", () => {
      this._handleOpenImagePopup();
    });
  };
}