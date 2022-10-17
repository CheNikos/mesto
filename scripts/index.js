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

const popups = document.querySelectorAll('.popup')
const profileEditPopup = document.querySelector('.popup_edit_profile');
const popupOpenProfile = document.querySelector('.profile__edit-button');
const popupCloseProfile = document.querySelector('.popup__close');
const formElementProfile = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const titleName = document.querySelector('.profile__title');
const subtitleJob = document.querySelector('.profile__subtitle');
const cards = document.querySelector('.elements');
const cardNewName = document.querySelector('.popup__input_card_name');
const cardNewLink = document.querySelector('.popup__input_card_link');
const cardNewAdd = document.querySelector('.popup__button_new');
const formElementNewCard = document.querySelector('.popup__form_new');
const imageBig = document.querySelector('.popup__zoom-image');
const zoomOpen = document.querySelector('.popup_zoom');
const imageBigZoom = document.querySelector('.popup__close_zoom');
const zoomName = document.querySelector('.popup__name-zoom');
const itemTemplate = document.querySelector('.element__template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopupEditProfile() {
  openPopup(profileEditPopup);

  nameInput.value = titleName.textContent;
  jobInput.value = subtitleJob.textContent;
};

function closePopupOverlay() {
  closePopup(profileEditPopup);
  closePopup(cardCreatePopup);
  closePopup(zoomOpen)
}

function closePopupEditProfile() {
  closePopup(profileEditPopup);
};

function submitHandlerProfile(evt) {
  evt.preventDefault();

  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;

  closePopup(profileEditPopup);
};

popupOpenProfile.addEventListener('click', openPopupEditProfile);
popupCloseProfile.addEventListener('click', closePopupEditProfile);
formElementProfile.addEventListener('submit', submitHandlerProfile);

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
} 

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__overlay')) {
      closePopup(popup);
    }
  });
});

function submitNewCardForm(evt) {
  evt.preventDefault();

  const userNewCard = {
    name:'',
    link:'',
  };

  userNewCard.name = cardNewName.value;
  userNewCard.link = cardNewLink.value;

	cards.prepend(createCard(userNewCard));

  cardNewName.value = "";
  cardNewLink.value = "";

  closeCardCreate();
  
  cardNewAdd.setAttribute('disabled', true);
  cardNewAdd.classList.add('popup__button_disabled');
}

function createCard(item) {
	const cardsNewElement = itemTemplate.cloneNode(true);
	const cardText = cardsNewElement.querySelector('.element__title');
  const cardImage = cardsNewElement.querySelector('.element__image');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  setListenersForCard(cardsNewElement);

  return cardsNewElement;
}

function renderInitialCards() {
  const initialCardsList = initialCards.map(createCard);
  
  cards.prepend(...initialCardsList);
}

function setListenersForCard(element) {
  const cardLike = element.querySelector('.element__like');
  cardLike.addEventListener('click', likeCard);

  const cardTrash = element.querySelector('.element__trash');
  cardTrash.addEventListener('click', deleteCard);

  const zoomImageName = element.querySelector('.element__title').textContent;
  const zoomImage = element.querySelector('.element__image');
  zoomImage.addEventListener('click', openZoomImage);
}

function openZoomImage(event) {
  const element = event.currentTarget.parentElement;
  const currentListItem = element.querySelector('.element__image');
  const currentListText = element.querySelector('.element__title').textContent;

  imageBig.src = currentListItem.src;
  zoomName.textContent = currentListText;
  imageBig.alt = currentListText;

  openPopup(zoomOpen);
};

function closeZoomImagePopup(){
  closePopup(zoomOpen);
}

function deleteCard(event) {
  const currentListItem = event.target.closest('.element');

  currentListItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like_active');
};

const cardCreatePopup = document.querySelector('.popup_new');
const cardOpenCreatePopupButton = document.querySelector('.profile__add-button');
const cardCloseCreatePopupButton = document.querySelector('.popup__close_new');

imageBigZoom.addEventListener('click', closeZoomImagePopup);

function openCardCreate() {
  openPopup(cardCreatePopup);
};

function closeCardCreate() {
  closePopup(cardCreatePopup);
};

cardOpenCreatePopupButton.addEventListener('click', openCardCreate);
cardCloseCreatePopupButton.addEventListener('click', closeCardCreate);
formElementNewCard.addEventListener('submit', submitNewCardForm);


renderInitialCards()


