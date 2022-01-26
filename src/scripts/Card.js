import { myID } from "../utils/constants";


export default class Card {
    constructor (cardForRender, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, myID) {
      this._link = cardForRender.link;
      this._name = cardForRender.name;
      this.id = cardForRender._id;
      this._ownerID = cardForRender.owner._id;
      this._myID = myID;
      this._likes = cardForRender.likes;
      this._likeCounter = cardForRender.likes.length;
      this._handleCardClick = handleCardClick;
      this._hadleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
      this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate () {
      this._element = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true)
    }
  
    _fillTemplate () {
      this._element.querySelector('.element__picture').src = this._link;
      this._element.querySelector('.element__picture').alt = ('Картинка "'+ this._name +'"');
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__like-counter').textContent = this._likeCounter;
    }
  
    _setEventListeners () {
      this._deleteButton = this._element.querySelector('.element__delete-button');
      this._deleteButton.addEventListener('click', ()=>{
        this._hadleDeleteClick(this.id, this._element);
      });
      this._likeButton = this._element.querySelector('.element__like-button');
      this._likeButton.addEventListener('click', ()=>{
        this._likeButton.classList.toggle('element__like-button_active');
        this._handleLikeClick(this.id, this._element);
      });
      const imageButton = this._element.querySelector('.element__image-button');
      imageButton.addEventListener('click', ()=>{
        this._handleCardClick(this._name, this._link);
      });
    }

    _isLiked() {
      const result = this._likes.find(item => item._id == this._myID)
      if (result != undefined){
        return true
      }
      else return false
    }

    generateCard () {
      this._getTemplate();
      this._fillTemplate();
      this._setEventListeners();

      if (this._ownerID != this._myID){
        this._deleteButton.disabled = true;
        this._deleteButton.classList.add('element__delete-button_inactive');
        this._deleteButton.classList.remove('element__delete-button');
      }

      if(this._isLiked()){
        this._likeButton.classList.add('element__like-button_active');
      }
      return this._element
    }
  }