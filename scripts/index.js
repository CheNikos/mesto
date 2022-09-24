let Popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');
let titleName = document.querySelector('.profile__title');
let subtitleJob = document.querySelector('.profile__subtitle');

function PopupOpen() {
  Popup.classList.add('popup_opened');
  nameInput.value = titleName.textContent;
  jobInput.value = subtitleJob.textContent;
};

function PopupClose() {
  Popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
  PopupClose()
};

openPopup.addEventListener('click', PopupOpen);
closePopup.addEventListener('click', PopupClose);
formElement.addEventListener('submit', formSubmitHandler);


const items = [
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

const cards = document.querySelector('.elements');
const itemTemplate = document.querySelector('.element__template').content;

function render() {
	items.forEach(renderItem);
}

function renderItem(item) {
	const newHtmlElement = itemTemplate.cloneNode(true);
	const cardText = newHtmlElement.querySelector('.element__title');
  const cardImage = newHtmlElement.querySelector('.element__image');
  cardText.textContent = item.name;
  cardImage.src = item.link;
  setListenersForItem(newHtmlElement);
	cards.appendChild(newHtmlElement);
}

function setListenersForItem(element) {
  const cardLike = element.querySelector('.element__like');
  cardLike.addEventListener('click', likeCard);

  const cardTrash = element.querySelector('.element__trash');
  cardTrash.addEventListener('click', cardDelete);

  const zoomImage = element.querySelector('.element__image');
  zoomImage.addEventListener('click', imageZoom);
  zoomImage.addEventListener('click', () => {
     textImage.textContent = textCard.textContent;
  });
  const textCard = element.querySelector('.element__title');
  const textImage = document.querySelector('.popup__name-zoom');
}

function imageZoom(event) {
  const currentListItem = event.target.closest('.element__image');
  const bigImage = document.querySelector('.popup__zoom-image');
  const openZoom = document.querySelector('.popup_zoom');
  openZoom.classList.add('popup_opened');
  bigImage.src = currentListItem.src;

  const closeBigImage = document.querySelector('.popup__close_zoom')
  function closeImage(){
    openZoom.classList.remove('popup_opened');
  }
  closeBigImage.addEventListener('click', closeImage);
};

function cardDelete(event) {
  const currentListItem = event.target.closest('.element');
  currentListItem.remove();
}

function likeCard(event) {
  const currentListItem = event.target.closest('.element__like');
  currentListItem.classList.toggle('element__like_active');
};


const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');
const addNewCard = document.querySelector('.popup__button_new');
let formElementNewCard = document.querySelector('.popup__form_new');

function formSubmitNewCard(evt) {
  evt.preventDefault();

  const newHtmlElement = itemTemplate.cloneNode(true);
	const cardText = newHtmlElement.querySelector('.element__title');
  const cardImage = newHtmlElement.querySelector('.element__image');
  cardText.textContent = newCardName.value;
  cardImage.src = newCardLink.value;

  setListenersForItem(newHtmlElement);
	cards.prepend(newHtmlElement);

  newCardName.value = "";
  newCardLink.value = "";

  CardCreateСlose()
}

const cardCreate = document.querySelector('.popup_new');
const openCardCreate = document.querySelector('.profile__add-button');
const closeCardCreate = document.querySelector('.popup__close_new');

function cardCreateOpen() {
  cardCreate.classList.add('popup_opened');
};

function CardCreateСlose() {
  cardCreate.classList.remove('popup_opened');
};

openCardCreate.addEventListener('click', cardCreateOpen);
closeCardCreate.addEventListener('click', CardCreateСlose);
formElementNewCard.addEventListener('submit', formSubmitNewCard)


render()


