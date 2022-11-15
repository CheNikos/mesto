import Card from '../components/Сard.js';
import { initialCards } from '../utils/initialCards.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { settingsList, popupOpenProfile, formElementProfile, formElementNewCard, cardOpenCreatePopupButton } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const cardList = new Section({
  items: initialCards,
  renderer: (object) => {
    cardList.addItem(createCard(object));
  },
  containerSelector: '.elements'
});
  
cardList.renderItems();

function createCard(object) {
  const cardsNewElement = new Card(object, handleCardClick).createCard();
  
  return cardsNewElement;
}

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image');
popupZoomImage.setEventListeners();

function handleCardClick(object) {
  popupZoomImage.open(object);
};

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  submitHandler: (object) => {
    userInfo.setUserInfo(object);
  }
});

popupEditProfile.setEventListeners();

const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_type_create-card',
  submitHandler: (object) => {
    cardList.addItem(createCard(object));
  }
});

popupCreateCard.setEventListeners();

const userInfo = new UserInfo({
  userName: '.profile__title',
  userJob: '.profile__subtitle'
});

const formValidatorProfile = new FormValidator (settingsList, formElementProfile);
const formValidatorCreateCard = new FormValidator (settingsList, formElementNewCard);

formValidatorCreateCard.enableValidation()
formValidatorProfile.enableValidation()

popupOpenProfile.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

cardOpenCreatePopupButton.addEventListener('click', () => {
  popupCreateCard.open();
});