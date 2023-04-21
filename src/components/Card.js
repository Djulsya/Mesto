export default class Card {
    constructor({ data, userId, handleCardClick, handleDeleteCard, handleLikeCard, handleDeleteLikeCard }, templateSelector) {
      this._data = data;
      this._name = data.name; // name alt
      this._link = data.link;
      this._templateSelector = templateSelector;
      this.handleCardClick = handleCardClick;
      this.handleDeleteCard = handleDeleteCard;
      this.handleLikeCard = handleLikeCard;
      this.handleDeleteLikeCard = handleDeleteLikeCard;
      this._likes = data.likes;
      this._userId = userId;
      this._id = data._id;
      this._owner = data.owner._id;
    }

    _getTemplate() {
      const cardTemplate = document
        .querySelector(this._templateSelector)
        .content.querySelector(".element")
        .cloneNode(true);
      return cardTemplate;
    }

    generateCard() {
      this._element = this._getTemplate();
      this.cardTitle = this._element.querySelector(".element__text");
      this.cardImage = this._element.querySelector(".element__photo");
      this.cardLike = this._element.querySelector(".element__button-like");
      this.likeCounter = this._element.querySelector(".element__button-quantity");
      this.deleteEl = this._element.querySelector(".element__button-delete");
      this.cardImage.src = this._link;
      this.cardTitle.textContent = this._name;
      //this.cardImage.name = `Перед вами ${this._name}`;
      this.likeCounter.textContent = this._likes.length;
      this._checkOwner();
      this._checkLikeOwner();
      this._trackEventListener();
      return this._element;
    }

    // добавляем или убираем лайк
    toggleLikeCard(data) {
      this._likes = data.likes;
      this.likeCounter.textContent = this._likes.length;
      this.cardLike.classList.toggle("element__button-like_active");
    }

    // удаление
    remove() {
      this._element.remove();
      this._element = null;
    }

    // открытие попапа
    _handleOpenImagePopup() {
      this.handleCardClick(this._name, this._link);
    }

    // все слушатели
    _trackEventListener() { // setEventListeners
      this.cardLike.addEventListener("click", () => {
        if (this.cardLike.classList.contains("element__button-like_active")) {
          this.handleDeleteLikeCard(this);
        } else {
          this.handleLikeCard(this);
        }
      });
      this.deleteEl.addEventListener("click", () => this.handleDeleteCard(this));
      this.cardImage.addEventListener("click", () => {
        this._handleOpenImagePopup();
      });
    }

    // получаем id
    getId() {
      return this._data._id;
    }

    // проверяем пользователя
    _checkOwner() {
      if (this._owner === this._userId) {
        this.deleteEl.classList.add("element__button-delete_on");
      }
    }

    // проверяем пользователя
    _checkLikeOwner() {
      // метод some проверяет условие
      if (this._likes.some((user) => this._userId === user._id)) {
        this.cardLike.classList.add("element__button-like_active");
      }
    }
  }




// export class Card {
//   constructor( 
//     { data,
//     userId,
//     handleCardClick,
//     handleDeleteCard,
//     handleLikeCard,
//     handleDeleteLikeCard,
//   },
//     templateSelector
//     ) { 
//       this._data = data;
//       this._name = data.name;
//       this._link = data.link;
//       this._templateSelector = templateSelector;
//       this.handleCardClick = handleCardClick;
//       this.handleDeleteCard = handleDeleteCard;
//       this.handleLikeCard = handleLikeCard;
//       this.handleDeleteLikeCard = handleDeleteLikeCard;
//       this._likes = data.likes;
//       this._userId = userId;
//       this._id = data._id;
//       this._owner = data.owner._id
//     };
//     // this._link = photo.link;
//     // this._name = photo.title;
//     // this._templateElement = templateElement;
//     // this._handleCardClick = handleCardClick;

//     // this._like = photo.like;
//     // this._owner = photo.owner;
//     // this._userId = userId;
//     // this._id = photo._id;

//     // this._handleLikeCard = handleLikeCard;
//     // this._handleDeleteClick = handleDeleteClick;

//     // this._isLike = false;

//     // this._buttonLike = this._element.querySelector('.element__button-like');

//     // 9ПР
//     // this._buttonDelete = this._elementPhoto.querySelector('.element__button-delete');
//     // this._handleDeleteCardClick = handleDeleteCardClick;
  

//   // _getTemplate() {
//   //   return document
//   //     .querySelector(this._templateElement)
//   //     .content.querySelector(".element")
//   //     .cloneNode(true);
//   // }

//   // _toggleLike() {
//   //   this._elementsItemLike.classList.toggle('element__button-like_active'); // evt.target
//   // };


//   // старое
//   // _toggleLike(evt) {
//   //   evt.target.classList.toggle('element__button-like_active');
//   // };
//   // старое

//   // новое
//   toggleLikeCard(data) {
//     this._likes = data.likes;
//     this.likeCounter.textContent = this._likes.length;
//     this.cardLike.classList.toggle('element__button-like_active');
//   }
// // новое

// // // из бионикла вроед
// //   numberOfLikes(newLikes) {
// //     this._like = newLikes;
// //     this._likeItem.textContent = this._like.length;
// //   }

// //   addLike() {
// //     this._buttonLike.classList.add('element__button-like_active');
// //   }

// //   deleteLike() {
// //     this._buttonLike.classList.remove('element__button-like_active');
// //   }
// // // из бионикла вроде

// // // старое
// //   _deleteElement(evt) {
// //     evt.target.closest('.element').remove(); 
// //   };
// // // старое

// // // старое
// //   _showCard() {
// //     const cardElement = this._templateElement.cloneNode(true);
// //     return cardElement;
// //   };
// // // старое

// // старое
//   // _trackEventListener() {
//   //   this._elementPhoto.addEventListener('click', () => { this._handleCardClick(this._link, this._name); })
//   //   this._createElement.querySelector('.element__button-delete').addEventListener('click', this._deleteElement.bind(this));
//   //   this._createElement.querySelector('.element__button-like').addEventListener('click', this._toggleLike);
//   // };
//   // старое

//   // новое
//   generateCard() {
//     this._element = this._getTemplate();
//     this.cardTitle = this._element.querySelector('.element__text');
//     this.cardImage = this._element.querySelector('.element__photo');
//     this.cardLike = this._element.querySelector('.element__button-like');
//     this.likeCounter = this._element.querySelector('.element__button-quantity');
//     this.deleteEl = this._element.querySelector('.element__button-delete');
//     this.cardImage.src = this._link;
//     this.cardTitle.textContent = this._name;
//     this.cardImage.alt = `Перед вами ${this._name}`;
//     this.likeCounter.textContent = this._likes.length;
//     this._checkOwner();
//     this._checkLikeOwner();
//     this._setEventListeners();
//     return this._element;
//   };
 
//   _getTemplate() {
//     const cardTemplate = document
//       .querySelector(this._templateSelector)
//       .content.querySelector('.element')
//       .cloneNode(true);
//     return cardTemplate;
//   }
// // все слушатели
// _trackEventListener() { // _setEventListeners
//   this.cardLike.addEventListener('click', () => {
//     if (this.cardLike.classList.contains('element__button-like_active')) {
//       this.handleDeleteLikeCard(this);
//     } else {
//       this.handleLikeCard(this);
//     }
//   });
//   this.deleteEl.addEventListener('click', () => this.handleDeleteCard(this));
//   this.cardImage.addEventListener('click', () => {
//     this._handleOpenImagePopup();
//   });
// }

//     // проверяем пользователя
// _checkOwner() {
//   if (this._owner === this._userId) {
//     this.deleteEl.classList.add('element__button-delete_on');
//   }
// }

// // проверяем пользователя
//   _checkLikeOwner() {
//     // метод some проверяет условие
//     if (this._likes.some((user) => this._userId === user._id)) {
//       this.cardLike.classList.add('element__button-like_active');
//     }
//   }

// };


//   // createNewCard() {
//   //   this._createElement = this._showCard();
//   //   this._createElement.querySelector('.element__text').textContent = this._name;
//   //   this._elementPhoto = this._createElement.querySelector('.element__photo');
//   //   this._deleteCard = this._createElement.querySelector('.element__button-delete');
//   //   this._likeItem = this._createElement.querySelector('.element__button-quantity');
//   //   this._elementPhoto.src = this._link;
//   //   this._elementPhoto.alt = this._name;
//   //   this._likeItem.textContent = this._like.length;

//   //   if (this._userId !== this._owner._id) this._deleteCard.remove();
//   //   this._elementsItemLike = this._createElement.querySelector('.element__button-like');
//   //   if (this._like.find(item => item._id === this._userId)) {
//   //     this._elementsItemLike.classList.add('element__button-like_active');
//   //     this._isLike = true;
//   //   }

//   //   this._trackEventListener();
//   //   return this._createElement;
//   // };

//   //  createNewCard(newLikes) {
//   //    this._trackEventListener();
//   //    this.numberOfLikes(newLikes);

//   //    this._elementPhoto.src = this._link;
//   //    this._elementPhoto.alt = this._name;
//   //    this._likeItem.textContent = this._like.length;

//   //    this._createElement.querySelector('.element__text').textContent = this._name;
//   //    this._deleteCard = this._createElement.querySelector('.element__button-delete');
//   //    //this._createElement = this._showCard();
//   //    //this._elementPhoto = this._createElement.querySelector('.element__photo');
//   //    //this._elementPhoto.src = this._link;
//   //    //this._trackEventListeners();
//   //    if (this._userId == this._owner._id)
//   //      this._deleteCard.classList.add('element__button-delete_on');

//   //    if(this.numberOfLikes()) {
//   //      this.addLike();
//   //    } else {
//   //      this.deleteLike();
//   //    }

//   //    return this._createElement;
//   //  };

//   // get isLike() {
//   //   return this._isLike;
//   // }

//   //   // statusLike() {
//   // //   this._isLike = !this._isLike;
//   // // }

//   // _handleImageClick() {
//   //   this._handleCardClick(this._name, this._link);
//   // };


 