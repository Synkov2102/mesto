import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithButton from '../scripts/PopupWithButton.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

import {popupEditForm, popupAddForm, popupAvatarForm, editButton, addButton, avatarButton, nameInput, jobInput,
   profileName, profileProfession, elementsSelector, cardTemplateSelector, settings, formValidators, popupAdd} from '../utils/constants.js'

import '../pages/index.css';
import { Promise } from 'core-js';


const userInfo = new UserInfo({nameSelector : '.profile__name', professionSelector: '.profile__profession', avatarSelector: '.profile__avatar'})
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  token: '01cce979-1d70-4bc2-9580-4862374310d8',
}
);

let myId = ""

const galleryCardList = new Section (
  (item) => {
  galleryCardList.addItem(createCard(item, myId))}
  , elementsSelector);


Promise.all([api.getCardsData(), api.getProfileInfo()])
.then(data => {
  myId = data[1]._id;
  galleryCardList.renderItems(data[0]);
  userInfo.setUserInfo(data[1].name, data[1].about, data[1].avatar);
})
.catch((err) => { 
  console.log(err); 
}); 

function createCard(item, myId){
  const card = new Card (item, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, myId);
  return card.generateCard();
}

function handlerEditFormSubmit (inputValues) {
  editPopup.renderLoading('Сохранение...') 
  api.patchProfileInfo(inputValues['name-input'], inputValues['profession-input'])
    .then(data=>{
      userInfo.setUserInfo(data.name, data.about, data.avatar);
      editPopup.close(); 
    })
    .catch((err) => { 
      console.log(err); 
    })
    .finally(()=>{
      editPopup.renderLoading('Сохраненить') 
    }) 
}

function handlerAddFormSubmit (inputValues) {
  addPopup.renderLoading('Добавление...') 
  api.makeNewCardData(inputValues['title-input'], inputValues['url-input'])
  .then((data)=>{
    galleryCardList.addNewItem(createCard(data, myId));
    
    addPopup.close();
  })
  .catch((err) => { 
    console.log(err); 
  })
  .finally(()=>{
    addPopup.renderLoading('Добавить')
    popupAddForm.reset();
  })
}

function handlerAvatarFormSubmit (inputValues){
  avatarPopup.renderLoading('Сохранение...') 
  api.patchAvatar(inputValues['url-avatar-input'])
    .then (data => {
      userInfo.setUserInfo(data.name, data.about, data.avatar)
      avatarPopup.close()
    })
    .catch((err) => { 
      console.log(err); 
    })
    .finally(()=>avatarPopup.renderLoading('Сохранить') )
}

const popupWithImage = new PopupWithImage('.popup_for_image');

popupWithImage.setEventListeners();

function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

function handlerCardDelete (id, card){
  api.deleteCardData(id)
  .then (()=>{
    card.removeCard()
    popupWithButton.close();
  })
  .catch((err) => { 
    console.log(err); 
  })
}
const popupWithButton = new PopupWithButton('.popup_for_delete', handlerCardDelete);

popupWithButton.setEventListeners();

function handleDeleteClick (id, card) {
  popupWithButton.open(id, card);
}

function handleLikeClick (id, element) {
  if (!element.querySelector('.element__like-button').classList.contains('element__like-button_active')){
    api.makeLike(id)
    .then((data)=>this.like(data))
    .catch((err) => { 
      console.log(err); 
    })
  }
  else {
    api.deleteLike(id)
    .then((data)=>this.like(data))
    .catch((err) => { 
      console.log(err); 
    })
  }
}

function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement)=>{
    const validator = new FormValidator(settings, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

const addPopup = new PopupWithForm ('.popup_for_add-button', handlerAddFormSubmit)

addPopup.setEventListeners();

const editPopup = new PopupWithForm ('.popup_for_edit-button', handlerEditFormSubmit)

editPopup.setEventListeners();

const avatarPopup = new PopupWithForm ('.popup_for_avatar', handlerAvatarFormSubmit)

avatarPopup.setEventListeners();

editButton.addEventListener('click',() => {
  editPopup.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  formValidators[popupEditForm.name].resetValidation();
});

addButton.addEventListener('click', () => {
  addPopup.open();
  formValidators[popupAddForm.name].resetValidation();
});

avatarButton.addEventListener('click', ()=> {
  avatarPopup.open()
  formValidators[popupAvatarForm.name].resetValidation();
})

enableValidation(settings);



