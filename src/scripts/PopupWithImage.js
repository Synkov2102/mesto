import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector){
        super(popupSelector);
    }

    open (name, link){
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__image').alt = ('Картинка "'+ name +'"');
        this._popup.querySelector('.popup__subtitle').textContent = name;
        super.open();
    }
}