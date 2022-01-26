import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
    constructor (popupSelector, handlerCardDelete) {
        super(popupSelector);
        this._handlerCardDelete = handlerCardDelete;
    }

    open (Id, element){
        this.Id = Id
        this.element = element
        super.open();
    }

    setEventListeners () {(
        this._popup.querySelector('.popup__container').addEventListener('click', () =>{
            this._handlerCardDelete(this.Id, this.element);
        }));
        super.setEventListeners();

    }
}