
export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._exitButton = this._popup.querySelector('.popup__exit-button');
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            console.log(this._popup)
        } 
    }
    

    open () {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    

    setEventListeners (){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        });


        this._exitButton.addEventListener('click', () => this.close());
    }
}