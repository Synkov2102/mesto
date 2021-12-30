import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handlerFormSubmit) {
        super(popupSelector);
        this._handlerForSubmit = handlerFormSubmit;
        this._inputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues () {
        const inputValues = {}
        this._inputs.forEach(item => {
            inputValues[`${item.id}`] = item.value;
        });
        return inputValues
    }

    close(){
        this._popup.querySelector('.popup__form').reset();
        super.close();
    }

    setEventListeners () {(
        this._popup.querySelector('.popup__container').addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._handlerForSubmit(this._getInputValues ())
        }));
        super.setEventListeners();
    }
}