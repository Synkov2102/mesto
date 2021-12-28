

export default class Card {
    constructor (cardForRender, cardTemplateSelector, handleCardClick) {
      this._link = cardForRender.link;
      this._name = cardForRender.name;
      this._handleCardClick = handleCardClick;
      this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate () {
      this._element = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true)
    }
  
    _fillTemplate () {
      // наполняем содержимым
      this._element.querySelector('.element__picture').src = this._link;
      this._element.querySelector('.element__picture').alt = ('Картинка "'+ this._name +'"');
      this._element.querySelector('.element__title').textContent = this._name;
    }
  
    _setEventListeners () {
      this._element.querySelector('.element__delete-button').addEventListener('click', ()=>{
        const element = this._element;
        element.remove();
      });
      const likeButton = this._element.querySelector('.element__like-button');
      likeButton.addEventListener('click', ()=>{
        likeButton.classList.toggle('element__like-button_active');
      });
      const imageButton = this._element.querySelector('.element__image-button');
      imageButton.addEventListener('click', ()=>{
        this._handleCardClick(this._name, this._link);
      });
    }
  
    generateCard () {
      this._getTemplate();
      this._fillTemplate();
      this._setEventListeners();
      return this._element
    }
  }