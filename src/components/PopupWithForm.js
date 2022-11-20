import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__button');
      }
    
      _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach(input => {
          this._inputsValues[input.name] = input.value;
        });
        
        return this._inputsValues;
      }

      setEventListeners() {
        super.setEventListeners();
    
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
    
          this._submitHandler(this._getInputValues());
          this.close();
        });
      }
    
      close() {
        super.close();
        this._form.reset();
      }
}