export const settingsList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: '.popup__error',
    inputErrorBorderBottom: 'popup__error_type',
    cardNewAdd: '.popup__button_new'
  }

export const popups = document.querySelectorAll('.popup')
export const profileEditPopup = document.querySelector('.popup_type_profile-edit');
export const popupOpenProfile = document.querySelector('.profile__edit-button');
export const popupCloseProfile = document.querySelector('.popup__close');
export const formElementProfile = document.querySelector('.popup__form');
export const nameInput = document.querySelector('.popup__input_form_name');
export const jobInput = document.querySelector('.popup__input_form_job');
export const titleName = document.querySelector('.profile__title');
export const subtitleJob = document.querySelector('.profile__subtitle');
export const cards = document.querySelector('.elements');
export const cardNewName = document.querySelector('.popup__input_card_name');
export const cardNewLink = document.querySelector('.popup__input_card_link');
export const formElementNewCard = document.querySelector('.popup__form_new');
export const imageBig = document.querySelector('.popup__zoom-image');
export const zoomOpen = document.querySelector('.popup_type_zoom-image');
export const imageBigZoom = document.querySelector('.popup__close_zoom');
export const zoomName = document.querySelector('.popup__name-zoom');
export const cardCreatePopup = document.querySelector('.popup_type_create-card');
export const cardOpenCreatePopupButton = document.querySelector('.profile__add-button');
export const cardCloseCreatePopupButton = document.querySelector('.popup__close_new');
export const avatarOpenChangePopup = document.querySelector('.profile__avatar');
export const formElementChangeAvatar = document.querySelector('.popup__form_avatar');
export const popupConfirmDelete = document.querySelector('.popup__button_confirm-delete');