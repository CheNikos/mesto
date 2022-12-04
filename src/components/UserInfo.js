export default class UserInfo {
    constructor({ name, about, avatar }) {
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
      this._avatar = document.querySelector(avatar);
    }
  
    getUserInfo() {
      const userProfile = {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src
      };
  
      return userProfile;
    }
    
    setUserInfo(object) {
      this._name.textContent = object.name;
      this._about.textContent = object.about;
      this.setUserAvatar
    }

    setUserAvatar(object) {
      this._avatar.src = object.avatar;
    }
  }