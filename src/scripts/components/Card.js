export class Card {
  constructor(photo, templateElement, handleCardClick) {
    this._link = photo.link;
    this._name = photo.title;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;

    // 9ПР
    // this._buttonDelete = this._elementPhoto.querySelector('.element__button-delete');
    // this._handleDeleteCardClick = handleDeleteCardClick;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  };

  _deleteElement(evt) {
    evt.target.closest('.element').remove();
  };

  _showCard() {
    const cardElement = this._templateElement.cloneNode(true);
    return cardElement;
  };

  _trackEventListeners() {
    this._elementPhoto.addEventListener('click', () => { this._handleCardClick(this._link, this._name); })
    this._createElement.querySelector('.element__button-delete').addEventListener('click', this._deleteElement.bind(this));
    this._createElement.querySelector('.element__button-like').addEventListener('click', this._toggleLike);
  };

  createNewCard() {
    this._createElement = this._showCard();
    this._createElement.querySelector('.element__text').textContent = this._name;
    this._elementPhoto = this._createElement.querySelector('.element__photo');
    this._elementPhoto.src = this._link;
    this._trackEventListeners();
    return this._createElement;
  };
};
