export default class Card {
    constructor({ data, templateSelector , handleCardClick, handleCardDelete }) {
      this._data = data
      this._name = data.name
      this._link = data.link
      this._handleCardClick = handleCardClick
      this._handleCardDelete = handleCardDelete
      this._templateSelector = templateSelector
    }

    _getTemplate() {
      return document
      .querySelector(this._templateSelector)
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
        this._handleCardDelete();
      });

      this._zoomImage.addEventListener('click', () => {
        this._handleCardClick(this._data)
      });
    }
}