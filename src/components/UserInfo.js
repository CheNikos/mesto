export default class UserInfo {
    constructor({ userName, userJob, avatarLink }) {
      this._userName = document.querySelector(userName);
      this._userJob = document.querySelector(userJob);
      this._avatarLink = document.querySelector(avatarLink);
    }
  
    getUserInfo() {
      const userProfile = {
        userName: this._userName.textContent,
        userJob: this._userJob.textContent
      };
  
      return userProfile;
    }
    
    setUserInfo(object) {
      this._userName.textContent = object.userName;
      this._userJob.textContent = object.userJob;
      this.setUserAvatar
    }

    setUserAvatar(object) {
      this._avatarLink.src = object.avatarLink;
    }
  }