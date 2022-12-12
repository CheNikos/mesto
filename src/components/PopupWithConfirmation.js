import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  setSubmitDelete(submitHandler) {
    this._handleSubmit = submitHandler;
  }
}
