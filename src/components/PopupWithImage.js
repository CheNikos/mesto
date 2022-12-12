import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(".popup__zoom-image");
    this._popupNameImage = this._popup.querySelector(".popup__name-zoom");
  }

  open(object) {
    super.open();

    this._popupImage.alt = object.name;
    this._popupImage.src = object.link;
    this._popupNameImage.textContent = object.name;
  }
}
