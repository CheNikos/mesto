import Card from '../components/Сard.js';
import { initialCards } from '../utils/initialCards.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { settingsList, 
  popups, 
  profileEditPopup, 
  popupOpenProfile, 
  popupCloseProfile, 
  formElementProfile, 
  nameInput, 
  jobInput, 
  titleName, 
  subtitleJob, 
  cards, 
  cardNewName, 
  cardNewLink, 
  formElementNewCard, 
  imageBig, 
  zoomOpen, 
  imageBigZoom, 
  zoomName, 
  cardCreatePopup, 
  cardOpenCreatePopupButton, 
  cardCloseCreatePopupButton } from '../utils/constants.js';

import Popup from '../components/Popup.js'




// добавление карточек и отрисовка

function createCard(object) {
  const cardsNewElement = new Card(object, openZoomImage).createCard();
  
  return cardsNewElement;
}
  
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    cardList.addItem(createCard(data));
  },
  containerSelector: '.elements'
});
  
cardList.renderItems();





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

  nameInput.value = titleName.textContent;
  jobInput.value = subtitleJob.textContent;
};

function closeZoomImagePopup(){
  closePopup(zoomOpen);
}

function openCardCreate() {
  openPopup(cardCreatePopup);
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

  formValidatorCreateCard.disableSubmitButton()
}

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

formValidatorCreateCard.enableValidation()
formValidatorProfile.enableValidation()