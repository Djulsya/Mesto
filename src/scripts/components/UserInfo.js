export class UserInfo {
  constructor({ name, about }) {
    this._nameProfile = name;
    this._aboutProfile = about;
  };

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._aboutProfile.textContent
    };
  };

  setUserInfo({ name, about }) {
    this._nameProfile.textContent = name;
    this._aboutProfile.textContent = about;
  };
};