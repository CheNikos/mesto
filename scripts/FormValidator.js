export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector
        this._inputSelector = config.inputSelector
        this._submitButtonElement = config.submitButtonElement
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._inputErrorBorderBottom = config.inputErrorBorderBottom
        this._buttonElement = this._formSelector.querySelector(this._submitButtonElement)
        this._inputList =  Array.from(this._formSelector.querySelectorAll(this._inputSelector))
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElements) => {
            inputElements.addEventListener('input', () => {
            this._checkInputValidity(inputElements);
            this._toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
          return this._inputList.some((inputElements) => {
            return !inputElements.validity.valid;
          })
        }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inpuList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
            } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled')
            }
    }

    _checkInputValidity(inputElements) {
        if (!inputElements.validity.valid) {
            this._showInputError(inputElements)
        } else {
            this._hideInputError(inputElements);
        }
    }

    _showInputError(inputElements) {
        inputElements.nextElementSibling.textContent = inputElements.validationMessage;
        inputElements.classList.add(this._inputErrorClass);
        inputElements.classList.add(this._inputErrorBorderBottom);
        }
            
    _hideInputError(inputElements) {
        inputElements.nextElementSibling.textContent = "";
        inputElements.classList.remove(this._inputErrorClass);
        inputElements.classList.remove(this._inputErrorBorderBottom);
        }

    
    enableValidation() {
        this._setEventListeners(this._formSelector);
    }
}