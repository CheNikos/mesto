import "./index.css";

import Card from "../components/Сard.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  settingsList,
  popupOpenProfile,
  formElementProfile,
  formElementNewCard,
  cardOpenCreatePopupButton,
  avatarOpenChangePopup,
  formElementChangeAvatar,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "676e4f4d-fe5d-40df-8843-a5ad03a99947",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userProfile]) => {
    userInfo.setUserInfo(userProfile);
    userId = userProfile._id;
    cardList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const cardList = new Section({
  renderer: (object) => {
    cardList.addItem(createCard(object));
  },
  containerSelector: ".elements",
});

function createCard(object) {
  const cardsNewElement = new Card({
    data: object,
    userId: userId,
    templateSelector: ".element__template",
    handleCardClick: (object) => {
      popupZoomImage.open(object);
    },
    handleCardDelete: (cardId) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.setSubmitDelete(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            popupDeleteConfirm.close();
            cardsNewElement.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handlePutLike: (cardId) => {
      api
        .putLike(cardId)
        .then((data) => {
          cardsNewElement.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          cardsNewElement.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });

  const card = cardsNewElement.createCard();
  return card;
}

const popupDeleteConfirm = new PopupWithConfirmation({
  popupSelector: ".popup_type_confirm-delete",
});

popupDeleteConfirm.setEventListeners();

const popupZoomImage = new PopupWithImage(".popup_type_zoom-image");
popupZoomImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-edit",
  submitHandler: (object) => {
    popupEditProfile.loadForm(true);
    api
      .updateUserInfo(object)
      .then((object) => {
        userInfo.setUserInfo(object);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfile.loadForm(false);
      });
  },
});

popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__avatar",
});

popupOpenProfile.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  formValidatorProfile.disableSubmitButton();
});

const popupCreateCard = new PopupWithForm({
  popupSelector: ".popup_type_create-card",
  submitHandler: (object) => {
    popupCreateCard.loadForm(true);
    api
      .addNewCard(object)
      .then((object) => {
        cardList.addItem(createCard(object));
        popupCreateCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupCreateCard.loadForm(false);
      });
  },
});

popupCreateCard.setEventListeners();

cardOpenCreatePopupButton.addEventListener("click", () => {
  popupCreateCard.open();
  formValidatorCreateCard.disableSubmitButton();
});

const popupAvatarChange = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitHandler: (object) => {
    popupAvatarChange.loadForm(true);
    api
      .editAvatar(object)
      .then((object) => {
        userInfo.setUserInfo(object);
        popupAvatarChange.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatarChange.loadForm(false);
      });
  },
});

popupAvatarChange.setEventListeners();

avatarOpenChangePopup.addEventListener("click", () => {
  popupAvatarChange.open();
  formValidatorChangeAvatar.disableSubmitButton();
});

const formValidatorProfile = new FormValidator(
  settingsList,
  formElementProfile
);
const formValidatorCreateCard = new FormValidator(
  settingsList,
  formElementNewCard
);
const formValidatorChangeAvatar = new FormValidator(
  settingsList,
  formElementChangeAvatar
);

formValidatorCreateCard.enableValidation();
formValidatorProfile.enableValidation();
formValidatorChangeAvatar.enableValidation();
