import Card from './Card.js'
import FormValidator from './FormValidator.js';

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

//Переменные для контейнеров в попапах
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupAddContainer = popupAdd.querySelector('.popup__container');

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
const elements = document.querySelector('.elements');

function exitByEsc (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_open')
    popupClose(popup);
  } 
}

const openPopup = (popup) =>{
  popup.classList.add('popup_open');

  document.addEventListener('keydown', exitByEsc);
}

const popupClose = (popup) =>{
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', exitByEsc);
}
const cardTemplate = document.querySelector('#element').content;



function handlerEditFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupClose(popupEdit);   
}

function handlerAddFormSubmit (evt) {
  evt.preventDefault(); 

  const object = {
    link: linkInput.value,
    name: titleInput.value
  };
  elements.prepend(createCard(object));
  popupClose(popupAdd);
  popupAddForm.reset();
}

// Функция для установки слушателей на попапы для закрытия по клику вне контента
function setClickExitListener(popupElement) {
  popupElement.addEventListener('click', (evt) => {
      if (evt.target === popupElement) {
          popupClose(popupElement);
      }
  });
}

function handleCardClick (name, link) {
  popupImage.querySelector('.popup__image').src = link;
  popupImage.querySelector('.popup__image').alt = ('Картинка "'+ name +'"');
  popupImage.querySelector('.popup__subtitle').textContent = name;
  openPopup(popupImage);
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

function createCard(item){
  const card = new Card (item, cardTemplate, handleCardClick);
  return card.generateCard();
}



editButton.addEventListener('click',() => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  formValidators[popupEditForm.name].resetValidation();
});
popupEditExitBtn.addEventListener('click',() => popupClose(popupEdit));

addButton.addEventListener('click', () => {
  openPopup(popupAdd)
  formValidators[popupAddForm.name].resetValidation();
});
popupAddExitBtn.addEventListener('click' ,() => popupClose(popupAdd));
popupImageExitBtn.addEventListener('click',() => popupClose(popupImage));

initialCards.forEach((item)=>{
  elements.append(createCard(item));
});

// Установка обработчиков на попапы для закрытия по клику вне контента
setClickExitListener(popupAdd);
setClickExitListener(popupEdit);
setClickExitListener(popupImage);

// Установка обработчиков на кноаки отправки формы
popupAddContainer.addEventListener('submit', handlerAddFormSubmit);
popupEditContainer.addEventListener('submit', handlerEditFormSubmit);

enableValidation(settings);



