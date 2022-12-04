import './index.css'

import Card from '../components/Сard.js';
import { initialCards } from '../utils/initialCards.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { settingsList, popupOpenProfile, formElementProfile, formElementNewCard, cardOpenCreatePopupButton, avatarOpenChangePopup, formElementChangePopup, popupConfirmDelete } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation'

const cardList = new Section({
  items: initialCards,
  renderer: (object) => {
    cardList.addItem(createCard(object));
  },
  containerSelector: '.elements'
});
  
cardList.renderItems();

function createCard(object) {
  const cardsNewElement = new Card({
    data: object,
    templateSelector: '.element__template',
    handleCardClick: (object) => {
      popupZoomImage.open(object);
    },
    handleCardDelete: (element) => {
      popupDeleteConfirm.open();
      popupConfirmDelete.addEventListener('click', () => {
        element.remove();
        popupDeleteConfirm.close()
      })
    }
  });

  const card = cardsNewElement.createCard();
  return card;
}

const popupDeleteConfirm = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm-delete'
});

popupDeleteConfirm.setEventListeners();

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image');
popupZoomImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  submitHandler: (object) => {
    userInfo.setUserInfo(object);
  }
});

popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
  userName: '.profile__title',
  userJob: '.profile__subtitle',
  avatarLink: '.profile__avatar'
});

popupOpenProfile.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  popupEditProfile.open();
  formValidatorProfile.disableSubmitButton()
});

const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_type_create-card',
  submitHandler: (object) => {
    cardList.addItem(createCard(object));
  }
});

popupCreateCard.setEventListeners();

cardOpenCreatePopupButton.addEventListener('click', () => {
  popupCreateCard.open();
  formValidatorCreateCard.disableSubmitButton()
});

const popupAvatarChange = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitHandler: (object) => {
    userInfo.setUserAvatar(object);
  }
});

popupAvatarChange.setEventListeners();

avatarOpenChangePopup.addEventListener('click', () => {
  popupAvatarChange.open();
  formValidatorChangeAvatar.disableSubmitButton()
});

const formValidatorProfile = new FormValidator (settingsList, formElementProfile);
const formValidatorCreateCard = new FormValidator (settingsList, formElementNewCard);
const formValidatorChangeAvatar = new FormValidator (settingsList, formElementChangePopup);

formValidatorCreateCard.enableValidation()
formValidatorProfile.enableValidation()
formValidatorChangeAvatar.enableValidation()


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
      authorization: "676e4f4d-fe5d-40df-8843-a5ad03a99947",
      'Content-Type': 'application/json',
  }
})

const a = api.getUserInfo();
const b = api.getInitialCards();


