import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open (name, link){
        this._popupImage.src = link;
        this._popupImage.alt = ('Картинка "'+ name +'"');
        this._popup.querySelector('.popup__subtitle').textContent = name;
        super.open();
    }
}