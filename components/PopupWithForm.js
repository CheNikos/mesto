import Popup from './Popup.js'
import UserInfo from './UserInfo.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__button');
      }
    
      _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
  
        return this._formValues;
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
    
      setInputValues(object) {
        console.log(object);
        this._inputList.forEach((input) => {
          input.value = object[input.name];
        });
        // const inputs = Array.from(this._inputList)
        // inputs[0].value = object.userName
        // inputs[1].value = object.userJob
        // return object
      }
}