// 1 вариант

// const formElement = document.querySelector('.popup__form');
// const formInputs = document.querySelectorAll('.popup__input');
// const saveButton = document.querySelector('.popup__button')

// const showError = (input, errorMessage) => {
//   input.classList.add('popup__input_type_error');
//   input.nextElementSibling.textContent = errorMessage;
//   input.nextElementSibling.classList.add('popup__input_form_error');
// };

// const hideError = (input) => {
//   input.classList.remove('popup__input_type_error');
//   input.nextElementSibling.classList.remove('popup__input_form_error');
//   input.nextElementSibling.textContent = '';
// };

// const checkInputValidity = (input) => {
//   if (!input.validity.valid) {
//     showError(input, input.validationMessage);
//     saveButton.setAttribute('disabled', true);
//     saveButton.classList.add('popup__button_disabled');
//   } else {
//     hideError(input);
//     saveButton.removeAttribute('disabled');
//     saveButton.classList.remove('popup__button_disabled');
//   }
// };

// formInputs.forEach(i => {
//   i.addEventListener('input', (evt) => checkInputValidity(evt.target))
// })

// formElement.addEventListener('submit', evt => evt.preventDefault())



//2 вариант (не работает вообще)

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input_form_error');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input_form_error');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//   });
// };

// enableValidation();

// function hasInvalidInput(inputList) {
// return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// }); 
// }

// function toggleButtonState(inputList, buttonElement) {
//   if(hasInvalidInput(inputList)) {
//     buttonElement.classList.add('popup__button_disabled');
//   } else {
//     buttonElement.classList.remove('popup__button_disabled');
// } 
// }





//3 вариант рабочий и по заданию но опять беда с поиском Error Element


const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
}


function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}


function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.popup__input_form_error`); // Выбираем элемент ошибки на основе уникального класса
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.popup__input_form_error`); // Выбираем элемент ошибки на основе уникального класса
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
}

enableValidation(settingsList);