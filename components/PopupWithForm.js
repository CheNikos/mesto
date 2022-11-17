import Popup from './Popup.js'
import { nameInput, jobInput, cardNewName, cardNewLink } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__button');
      }
    
      _getInputValues() {
        return {
          userName: nameInput.value,
          userJob: jobInput.value,
          name: cardNewName.value,
          link: cardNewLink.value,
        }
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