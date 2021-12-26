import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';
//Массив данных для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];    

//Переменные для попапов
const popupEdit = document.querySelector('.popup_for_edit-button');
const popupAdd = document.querySelector('.popup_for_add-button');
//Переменные для форм попапов

const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');

//Переменная блока профиля
const profile = document.querySelector('.profile');

//Кнопки открытия форм
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_for_image');

//Переменные для кнопок в попапах
const popupEditExitBtn = popupEdit.querySelector('.popup__exit-button');
const popupAddExitBtn = popupAdd.querySelector('.popup__exit-button');
const popupImageExitBtn = popupImage.querySelector('.popup__exit-button');

// Переменный полей попапов
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_profession');
const titleInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

// Переменные имени и вида деятельности профиля на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//Переменная блока элементов
const elementsSelector = '.elements';
const cardTemplate = document.querySelector('#element').content;

const userInfo = new UserInfo({nameSelector : '.profile__name', professionSelector: '.profile__profession'})

function createCard(item){
  const card = new Card (item, cardTemplate, handleCardClick);
  return card.generateCard();
}

function handlerEditFormSubmit (evt) {
  evt.preventDefault(); 
  userInfo.setUserInfo(nameInput.value, jobInput.value)
  editPopup.close();  
}

function handlerAddFormSubmit (evt) {
  evt.preventDefault(); 

  const object = {
    link: linkInput.value,
    name: titleInput.value
  };
  document.querySelector(elementsSelector).prepend(createCard(object));
  addPopup.close();
  popupAddForm.reset();
}

const popupWithImage = new PopupWithImage('.popup_for_image');

popupWithImage.setEventListeners();

function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

const formValidators = {};
const settings = {
  formElementSelector: '.popup__text-inputs',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  
}

function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement)=>{
    const validator = new FormValidator(settings, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

const galleryCardList = new Section ({
  items: initialCards,
  renderer:(item) => {
    const card = new Card (item, cardTemplate, handleCardClick);
    const cardElement = card.generateCard();
    galleryCardList.addItem(cardElement);
  }
}, elementsSelector);

galleryCardList.renderItems();

const addPopup = new PopupWithForm ('.popup_for_add-button', handlerAddFormSubmit, ()=>{
  this._link = linkInput.value,
  this._name = titleInput.value
})

addPopup.setEventListeners();

const editPopup = new PopupWithForm ('.popup_for_edit-button', handlerEditFormSubmit, ()=>{
this._name = nameInput.value;
this._profesion = jobInput.value;
})

editPopup.setEventListeners();

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

enableValidation(settings);



