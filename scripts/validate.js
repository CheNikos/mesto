const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__input');
const formError = document.querySelector('.popup__input_form_error');

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input_form_error');
};

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input_form_error');
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});