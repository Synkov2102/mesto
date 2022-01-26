import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithButton from '../scripts/PopupWithButton.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

import { myID, popupEditForm, popupAddForm, popupAvatarForm, editButton, addButton, avatarButton, nameInput, jobInput,
   profileName, profileProfession, elementsSelector, cardTemplateSelector, settings, formValidators, popupAdd} from '../utils/constants.js'

import '../pages/index.css';


const userInfo = new UserInfo({nameSelector : '.profile__name', professionSelector: '.profile__profession', avatarSelector: '.profile__avatar'})
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  token: '01cce979-1d70-4bc2-9580-4862374310d8',
},
  renderLoading
);

function clearCards (){
  const element = document.querySelector(elementsSelector);
  while (element.firstChild) {
  element.removeChild(element.firstChild);
  }
}


function renderCards (){
  clearCards();
  api.getCardsData()
  .then(data => {
    const galleryCardList = new Section ({
      items: data,
      renderer:(item) => {
      galleryCardList.addItem(createCard(item));}
       }, elementsSelector);
     
     galleryCardList.renderItems();
  })
}

renderCards();

function renderLoading (isLoading, popupSelector) {
  const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button-submit')
  if (isLoading){
    if (buttonElement.value === 'Сохранить'){
      buttonElement.value='Cохранение...'
    }
    else if (buttonElement.value === 'Создать') {
      buttonElement.value = 'Создание...'
    }
  }
  else {
    if (buttonElement.value === 'Cохранение...'){
      buttonElement.value = 'Сохранить'
    }
    else if (buttonElement.value === 'Создание...') {
      buttonElement.value = 'Создать'
    }
  } 
}

api.getProfileInfo().then (data => {
  userInfo.setUserInfo(data.name, data.about, data.avatar)})

function createCard(item){
  const card = new Card (item, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, myID);
  return card.generateCard();
}

function handlerEditFormSubmit (inputValues) {
  api.patchProfileInfo(inputValues['name-input'], inputValues['profession-input'])
    .then(data=>{
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
  editPopup.close();  
}

function handlerAddFormSubmit (inputValues) { 
  api.makeNewCardData(inputValues['title-input'], inputValues['url-input'])
  .then(()=>renderCards())
  .finally(()=>{
    addPopup.close();
    popupAddForm.reset();
  })
  
}

function handlerAvatarFormSubmit (inputValues){
  api.patchAvatar(inputValues['url-avatar-input'])
    .then (data => {
      userInfo.setUserInfo(data.name, data.about, data.avatar)
    })
    .finally(()=>avatarPopup.close())
}

const popupWithImage = new PopupWithImage('.popup_for_image');

popupWithImage.setEventListeners();

function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

function handlerCardDelete (Id, element){
  api.deleteCardData(Id)
  element.remove();
  popupWithButton.close();
}
const popupWithButton = new PopupWithButton('.popup_for_delete', handlerCardDelete);

popupWithButton.setEventListeners();

function handleDeleteClick (Id, element) {
  popupWithButton.open(Id, element);
}

function handleLikeClick (Id, element) {
  if (element.querySelector('.element__like-button').classList.contains('element__like-button_active')){
    api.makeLike(Id)
      .then(data=>{
        element.querySelector(".element__like-counter").textContent = data.likes.length;
      })

  }
  else {
    api.deleteLike(Id)
    .then(data=>{
      element.querySelector(".element__like-counter").textContent = data.likes.length;
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



