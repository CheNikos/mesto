export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector
        this._inputSelector = config.inputSelector
        this._submitButtonElement = config.submitButtonElement
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._inputErrorBorderBottom = config.inputErrorBorderBottom
        this._cardNewAdd = config.cardNewAdd
        this._buttonCreateElement = this._formSelector.querySelector(this._submitButtonElement)
        this._buttonElement = this._formSelector.querySelector(this._submitButtonElement)
        this._inputList =  Array.from(this._formSelector.querySelectorAll(this._inputSelector))
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
          return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          })
        }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton()
        } else {
            this._enableSubmitButton()
        }
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }
    
    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled')
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        inputElement.nextElementSibling.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
        inputElement.classList.add(this._inputErrorBorderBottom);
        }
            
    _hideInputError(inputElement) {
        inputElement.nextElementSibling.textContent = "";
        inputElement.classList.remove(this._inputErrorClass);
        inputElement.classList.remove(this._inputErrorBorderBottom);
        }

    
    enableValidation() {
        this._setEventListeners();
    }
}