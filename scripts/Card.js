export default class Card {
    constructor (cardForRender, сardTemplate) {
      this._link = cardForRender.link;
      this._name = cardForRender.name;
      this._element = сardTemplate.querySelector('.element').cloneNode(true);
    }
  
    _fillTemplate () {
      // наполняем содержимым
      this._element.querySelector('.element__picture').src = this._link;
      this._element.querySelector('.element__picture').alt = ('Картинка "'+ this._name +'"');
      this._element.querySelector('.element__title').textContent = this._name;
    }
  
    _setEventListenerForDeleteButton () {
      this._element.querySelector('.element__delete-button').addEventListener('click', ()=>{
        const element = this._element;
        element.remove();
      });
    }
  
    _setEventListenerForLike () {
      const likeButton = this._element.querySelector('.element__like-button');
      likeButton.addEventListener('click', ()=>{
        likeButton.classList.toggle('element__like-button_active');
      });
    }
  
    generateCard () {
      this._fillTemplate();
      this._setEventListenerForDeleteButton();
      this._setEventListenerForLike();
  
      return this._element
    }
  }