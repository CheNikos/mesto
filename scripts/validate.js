const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input_form_error'
}

function enableValidation(elements) {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach((elementsForm) => {
    elementsForm.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(elementsForm, elements);
  });
}

function setEventListeners(elementsForm, elements) {
  const inputList = Array.from(elementsForm.querySelectorAll(elements.inputSelector));
  const buttonElement = elementsForm.querySelector(elements.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, elements);
  inputList.forEach((inputElements) => {
    inputElements.addEventListener('input', () => {
      checkInputValidity(elementsForm, inputElements, elements);
      toggleButtonState(inputList, buttonElement, elements);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElements) => {
    return !inputElements.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, elements) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(elements.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(elements.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

function checkInputValidity(elementsForm, inputElements, elements) {
  if (!inputElements.validity.valid) {
    showInputError(elementsForm, inputElements, inputElements.validationMessage, elements);
  } else {
    hideInputError(elementsForm, inputElements, elements);
  }
}

function showInputError(elementsForm, inputElements, errorMessage, elements) {
  inputElements.nextElementSibling.textContent = errorMessage;
  inputElements.classList.add(elements.inputErrorClass);
}

function hideInputError(elementsForm, inputElements, elements) {
  inputElements.nextElementSibling.textContent = "";
  inputElements.classList.remove(elements.inputErrorClass);
}

enableValidation(settingsList);