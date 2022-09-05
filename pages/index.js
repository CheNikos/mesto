let popup = document.querySelector('.popup');
let btn = document.querySelector('.info__edit-button');
let close = document.querySelector('.popup__close');

btn.addEventListener('click', function(event){
    event.preventDefault();
    popup.classList.remove('popup_opened');
});

popup.addEventListener('click', function(event) {
  e = event || window.event
  if (e.target == this) {
    popup.classList.add('popup_opened');
  }
});

close.addEventListener("click", function(event){
    event.preventDefault();
    popup.classList.add('popup_opened');
});

let formElement = document.querySelector('.popup__button').onclick = clickSave;

function clickSave() {
  evt.preventDefault();
  let name = document.querySelector('.popup__input-name').value;
  document.querySelector('.info__title').textContent = name;

  let job = document.querySelector('.popup__input-job').value;
  document.querySelector('.info__subtitle').textContent = job;

  popup.classList.add('popup_opened');
}

formElement.addEventListener('submit', clickSave); 
