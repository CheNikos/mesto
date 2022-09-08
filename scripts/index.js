let Popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__inputs');
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
