const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Амстердам',
      link: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Гент',
      link: 'https://images.unsplash.com/photo-1609716637664-ed0ebc5201b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Крым',
      link: 'https://images.unsplash.com/photo-1599758417353-3b66f35e5d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Сиена',
      link: 'https://images.unsplash.com/photo-1612820676918-1682b0d4afa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export default class Card {
    constructor(object, openZoomImage) {
      this._name = object.name
      this._link = object.link
      this._openZoomImage = openZoomImage
    }

    _getTemplate() {
      const cardElement = document
      .querySelector('.element__template')
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
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
      this._openZoomImage(this._link, this._name)
      });
    }
}

initialCards.forEach((object) => {
  const card = new Card(object);
  const cardElement = card.createCard();

  document.querySelector('.elements').append(cardElement);
}); 
