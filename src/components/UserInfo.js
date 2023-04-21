export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameProfile = name;
    this._aboutProfile = about;
    this._avatarProfile = avatar;
  };

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._aboutProfile.textContent
    };
  };

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
    };
  };

  setUserAvatar(link) {
    this._avatarProfile.src = link;
  };
}