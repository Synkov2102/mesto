  
  //Переменные для попапов
  export const popupEdit = document.querySelector('.popup_for_edit-button');
  export const popupAdd = document.querySelector('.popup_for_add-button');
  export const popupAvatar = document.querySelector('.popup_for_avatar');
  //Переменные для форм попапов
  
  export const popupEditForm = popupEdit.querySelector('.popup__form');
  export const popupAddForm = popupAdd.querySelector('.popup__form');
  export const popupAvatarForm = popupAvatar.querySelector('.popup__form');
  
  //Переменная блока профиля
  export const profile = document.querySelector('.profile');
  
  //Кнопки открытия форм
  export const editButton = profile.querySelector('.profile__edit-button');
  export const addButton = profile.querySelector('.profile__add-button');
  export const avatarButton = profile.querySelector('.profile__pen-icon')
  
  // Переменный полей попапов
  export const nameInput = popupEdit.querySelector('.popup__input_type_name');
  export const jobInput = popupEdit.querySelector('.popup__input_type_profession');
  
  // Переменные имени и вида деятельности профиля на странице
  export const profileName = document.querySelector('.profile__name');
  export const profileProfession = document.querySelector('.profile__profession');
  
  //Переменная блока элементов
  export const elementsSelector = '.elements';
  export const cardTemplateSelector = '#element';

  export const settings = {
    formElementSelector: '.popup__text-inputs',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
  
  export const formValidators = {};
