// попап редактирования
// export class UserInfo {
//     constructor({ name, about, avatar }) {
//       // передем обьект, чтобы потом вставить нужные значения
//       this._name = document.querySelector(name); // селектор имя
//       this._about = document.querySelector(about); //селектор обо мне
//       this._avatar = document.querySelector(avatar); // селектор аватара
//     }

export default class UserInfo { // это уже корректное
  constructor({ name, about, avatar }) {
    this._nameProfile = name;
    this._aboutProfile = about;
    this._avatarProfile = avatar;
  };

  //  getUserInfo() {
  //    //возвращаем значения
  //    const info = {};
  //    info.name = this._nameProfile.textContent;
  //    info.about = this._aboutProfile.textContent;
  //    return info;
  //  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._aboutProfile.textContent
    };
  };

  //  setUserInfo({ name, about, avatar }) {
  //    // проверяем значения чтобы вставить нужное
  //    if (name) {
  //      this._nameProfile.textContent = name; /// data from the user
  //    }
  //    if (about) {
  //      this._aboutProfile.textContent = about; /// data from the user
  //    }
  //    if (avatar) {
  //      this._avatarProfile.src = avatar; /// data from the user
  //    }
  //  }

  getUserId() {
    return this._id;
  };

  setUserInfo(data) {
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
    this._id = data._id;
    if (data.name) this._nameProfile.textContent = this.name;
    if (data.about) this._aboutProfile.textContent = this.about;
    if (data.avatar) {
      this._avatarProfile.src = this.avatar
      this._avatarProfile.alt = this.name
    }
  };

  // вставляем значения для аватара
  setAvatarInfo({ link }) {
    this._avatarProfile.src = link;
  }

  setUserAvatar(link) {
    this._avatarProfile.src = link;
  }
}




// export class UserInfo {
//   constructor({ name, about, avatar }) {
//     this._nameProfile = name;
//     this._aboutProfile = about;
//     this._avatarProfile = avatar;
//   };

//    getUserInfo() {
//      return {
//        name: this._nameProfile.textContent,
//        about: this._aboutProfile.textContent
//      };
//    };

//   // getUserId() {
//   //   return this._id;
//   // };

//   // setUserAvatar(link) {
//   //   this._avatarProfile.src = link;
//   // }

//   // setUserInfo(data) {
//   //   this.name = data.name;
//   //   this.about = data.about;
//   //   this.avatar = data.avatar;
//   //   this._id = data._id;
//   //   if (data.name) this._nameProfile.textContent = this.name;
//   //   if (data.about) this._aboutProfile.textContent = this.about;
//   //   if (data.avatar) {
//   //     this._avatarProfile.src = this.avatar
//   //     this._avatarProfile.alt = this.name
//   //   }
//   // };
// };