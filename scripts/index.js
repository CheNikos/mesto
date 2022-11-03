import Card from './Сard.js';
import { initialCards } from './initialCards.js';
import FormValidator from './FormValidator.js';

const settingsList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: '.popup__error',
    inputErrorBorderBottom: 'popup__error_type',
    cardNewAdd: '.popup__button_new'
  }

const popups = document.querySelectorAll('.popup')
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
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
const formElementNewCard = document.querySelector('.popup__form_new');
const imageBig = document.querySelector('.popup__zoom-image');
const zoomOpen = document.querySelector('.popup_type_zoom-image');
const imageBigZoom = document.querySelector('.popup__close_zoom');
const zoomName = document.querySelector('.popup__name-zoom');
const cardCreatePopup = document.querySelector('.popup_type_create-card');
const cardOpenCreatePopupButton = document.querySelector('.profile__add-button');
const cardCloseCreatePopupButton = document.querySelector('.popup__close_new');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closePopupEditProfile() {
  closePopup(profileEditPopup);
};

function openPopupEditProfile() {
  openPopup(profileEditPopup);
  formValidatorProfile.enableValidation()

  nameInput.value = titleName.textContent;
  jobInput.value = subtitleJob.textContent;
};

function closeZoomImagePopup(){
  closePopup(zoomOpen);
}

function openCardCreate() {
  openPopup(cardCreatePopup);
  formValidatorCreateCard.enableValidation()
};

function closeCardCreate() {
  closePopup(cardCreatePopup);
};

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

function submitHandlerProfile(evt) {
  evt.preventDefault();

  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;

  closePopup(profileEditPopup);
};

function submitNewCardForm(evt) {
  evt.preventDefault();

  const userNewCard = {
    name: cardNewName.value,
    link: cardNewLink.value,
  };

	cards.prepend(createCard(userNewCard));

  cardNewName.value = "";
  cardNewLink.value = "";

  closeCardCreate();

  disableButton.disableButtonAfterCreate();
}

function createCard(object) {
	const cardsNewElement = new Card(object, openZoomImage).createCard();

  return cardsNewElement;
}

initialCards.forEach((object) => {
  const card = createCard(object);
  cards.append(card);
}); 

function openZoomImage(name, link) {
  imageBig.src = link;
  zoomName.textContent = name;
  imageBig.alt = name;

  openPopup(zoomOpen);
};

cardOpenCreatePopupButton.addEventListener('click', openCardCreate);
cardCloseCreatePopupButton.addEventListener('click', closeCardCreate);
formElementNewCard.addEventListener('submit', submitNewCardForm);
popupOpenProfile.addEventListener('click', openPopupEditProfile);
popupCloseProfile.addEventListener('click', closePopupEditProfile);
formElementProfile.addEventListener('submit', submitHandlerProfile);
imageBigZoom.addEventListener('click', closeZoomImagePopup);

const formValidatorProfile = new FormValidator (settingsList, profileEditPopup);
const formValidatorCreateCard = new FormValidator (settingsList, cardCreatePopup);
const disableButton = new FormValidator (settingsList, cardCreatePopup);