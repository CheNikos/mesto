let formElement = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function(e) {
  e.preventDefault();
  formElement.classList.add('popup_opened');
});

closePopup.addEventListener('click', function () {
  formElement.classList.remove('popup_opened');
});

 let nameInput = document.querySelector('.popup__input_form_name');
 let jobInput = document.querySelector('.popup__input_form_job');
 let savePopup = document.querySelector('.popup__button');

 function formSubmitHandler (evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(jobInput.value);

  let titleName = document.querySelector('.profile__title');
  let subtitleJob = document.querySelector('.profile__subtitle');

  titleName.textContent = nameInput.value;
  subtitleJob.textContent = jobInput.value;
 }

  savePopup.addEventListener('click', function () {
  formElement.classList.remove('popup_opened');
 });

 formElement.addEventListener('submit', formSubmitHandler);
