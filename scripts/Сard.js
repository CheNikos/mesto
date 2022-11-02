export default class Card {
    constructor(object, openZoomImage) {
      this._name = object.name
      this._link = object.link
      this._openZoomImage = openZoomImage
    }

    _getTemplate() {
      return document
      .querySelector('.element__template')
      .content
      .querySelector('.element')
      .cloneNode(true);
    }

    createCard() {
      this._element = this._getTemplate();
      
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;

      this._setEventListeners();
  
      return this._element; 
    }

    _setEventListeners() {
      this._likeButton = this._element.querySelector('.element__like');
      this._trashButton = this._element.querySelector('.element__trash');
      this._zoomImage = this._element.querySelector('.element__image');

      this._likeButton.addEventListener('click', () => {
        this._likeButton.classList.toggle('element__like_active');
      });

      this._trashButton.addEventListener('click', () => {
        this._element.remove();
      });

      this._zoomImage.addEventListener('click', () => {
        this._openZoomImage(this._name, this._link)
      });
    }
}
