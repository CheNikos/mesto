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

const editProfilePopup = document.querySelector('.popup_edit_profile');
const openPopupProfile = document.querySelector('.profile__edit-button');
const closePopupProfile = document.querySelector('.popup__close');
const formElementProfile = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
let titleName = document.querySelector('.profile__title');
let subtitleJob = document.querySelector('.profile__subtitle');
const cards = document.querySelector('.elements');
const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');
const addNewCard = document.querySelector('.popup__button_new');
let formElementNewCard = document.querySelector('.popup__form_new');
const bigImage = document.querySelector('.popup__zoom-image');
const openZoom = document.querySelector('.popup_zoom');
const closeBigImage = document.querySelector('.popup__close_zoom');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile() {
  openPopup(editProfilePopup);
  nameInput.value = titleName.textContent;
  jobInput.value = subtitleJob.textContent;
};

function closePopupEditProfile() {
  closePopup(editProfilePopup);
};

function submitHandlerProfile(evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

openPopupProfile.addEventListener('click', openPopupEditProfile);
closePopupProfile.addEventListener('click', closePopupEditProfile);
formElementProfile.addEventListener('submit', submitHandlerProfile);

function formSubmitNewCard(evt) {
  evt.preventDefault();

  const userNewCard = {
    name:'',
    link:'',
  };

  userNewCard.name = newCardName.value;
  userNewCard.link = newCardLink.value;
	cards.prepend(createCard(userNewCard));
  newCardName.value = "";
  newCardLink.value = "";

  CardCreateСlose()
}

function createCard(item) {
  const itemTemplate = document.querySelector('.element__template').content;
	const newCardsElement = itemTemplate.cloneNode(true);
	const cardText = newCardsElement.querySelector('.element__title');
  const cardImage = newCardsElement.querySelector('.element__image');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  setListenersForCard(newCardsElement);

  return newCardsElement;
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

  const zoomImage = element.querySelector('.element__image');
  zoomImage.addEventListener('click', openZoomImage);
  zoomImage.addEventListener('click', () => {
    zoomImageText.textContent = textCard.textContent;
  });
  const textCard = element.querySelector('.element__title');
  const zoomImageText = document.querySelector('.popup__name-zoom');
}

function openZoomImage(event) {
  const currentListItem = event.target.closest('.element__image');
  openPopup(openZoom);
  bigImage.src = currentListItem.src;
  bigImage.alt = currentListItem.alt;
};

function closeZoomImagePopup(){
  closePopup(openZoom);
}

function deleteCard(event) {
  const currentListItem = event.target.closest('.element');
  currentListItem.remove();
}

function likeCard(event) {
  let currentListItem = event.target.classList.toggle('element__like_active');
};

const createCardPopup = document.querySelector('.popup_new');
const openCreateCardPopupButton = document.querySelector('.profile__add-button');
const closeCreateCardPopupButton = document.querySelector('.popup__close_new');
closeBigImage.addEventListener('click', closeZoomImagePopup);

function cardCreateOpen() {
  openPopup(createCardPopup);
};

function CardCreateСlose() {
  closePopup(createCardPopup);
};

openCreateCardPopupButton.addEventListener('click', cardCreateOpen);
closeCreateCardPopupButton.addEventListener('click', CardCreateСlose);
formElementNewCard.addEventListener('submit', formSubmitNewCard)


renderInitialCards()


