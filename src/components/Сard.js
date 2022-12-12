export default class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handlePutLike,
    handleRemoveLike,
    userId,
  }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._templateSelector = templateSelector;
    this._cardId = data._id;
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
    this._likes = data.likes;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._likesNumber = this._element.querySelector(".element__numbers");
    this._likesNumber.textContent = this._likes.length;
    this._trashButton = this._element.querySelector(".element__trash");
    this._setEventListeners();
    this._checkDeleteButton();
    this._checkCardLiked();

    return this._element;
  }

  deleteCard() {
    this._element.closest(".element").remove();
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like");
    this._zoomImage = this._element.querySelector(".element__image");

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like_active")) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handlePutLike(this._cardId);
      }
    });

    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this._cardId);
    });

    this._zoomImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like_active");
  }

  _checkDeleteButton() {
    if (this._userId !== this._cardOwnerId) {
      this._trashButton.remove();
    }
  }

  _checkCardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add("element__like_active");
    }
  }
}
