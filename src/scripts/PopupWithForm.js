import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handlerFormSubmit, getInputValues) {
        super(popupSelector);
        this._handlerForSubmit = handlerFormSubmit;
        this._getInputValues = getInputValues;
    }

    close(){
        this._popup.querySelector('.popup__form').reset();
        super.close();
    }

    setEventListeners () {
        this._popup.querySelector('.popup__container').addEventListener('submit', this._handlerForSubmit);
        super.setEventListeners();
    }
}