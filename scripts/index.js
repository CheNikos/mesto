let formElement = document.querySelector('.popup');
let openPopup = document.querySelector('.info__edit-button');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function(e) {
  e.preventDefault();
  formElement.classList.add('popup_opened');
});

closePopup.addEventListener('click', function () {
  formElement.classList.remove('popup_opened');
});

let formSubmit = document.querySelector('.popup__button').onclick = clickSave;

function clickSave(evt) {
  evt.preventDefault();
  let name = document.querySelector('.popup__input-name').value;
  document.querySelector('.info__title').textContent = name;

  let job = document.querySelector('.popup__input-job').value;
  document.querySelector('.info__subtitle').textContent = job;

  formElement.classList.remove('popup_opened');
}

formSubmit.addEventListener('submit', clickSave); 
