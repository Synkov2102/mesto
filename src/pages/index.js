import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import { initialCards, popupEditForm, popupAddForm, editButton, addButton, nameInput, jobInput,
   profileName, profileProfession, elementsSelector, cardTemplateSelector} from '../utils/constants.js'

import '../pages/index.css';

const userInfo = new UserInfo({nameSelector : '.profile__name', professionSelector: '.profile__profession'})

function createCard(item){
  const card = new Card (item, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}

function handlerEditFormSubmit (inputValues) {
  userInfo.setUserInfo(inputValues[0], inputValues[1])
  editPopup.close();  
}

function handlerAddFormSubmit (inputValues) { 
  const object = {
    link: inputValues[1],
    name: inputValues[0]
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
    galleryCardList.addItem(createCard(item));
  }
}, elementsSelector);

galleryCardList.renderItems();

const addPopup = new PopupWithForm ('.popup_for_add-button', handlerAddFormSubmit)

addPopup.setEventListeners();

const editPopup = new PopupWithForm ('.popup_for_edit-button', handlerEditFormSubmit)

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



