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

function escExit (event) {
  const popup = document.querySelector('.popup_open')
  if (event.key === 'Escape') {
    popupClose(popup);
  } 
}

const popupOpen = (popup) =>{
  popup.classList.add('popup_open');

  document.addEventListener('keydown', escExit);
}

const popupClose = (popup) =>{
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', escExit);
}

const cardOutput = (cardForRender) =>{
  const elementTemplate = document.querySelector('#element').content;
  // клонируем содержимое тега template
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  elementElement.querySelector('.element__picture').src = cardForRender.link;
  elementElement.querySelector('.element__picture').alt = ('Картинка "'+ cardForRender.name +'"');
  elementElement.querySelector('.element__title').textContent = cardForRender.name;


  const deleteButton = elementElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', ()=>{
    const element = elementElement;
    element.remove();
  });

  const likeButton = elementElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', ()=>{
    likeButton.classList.toggle('element__like-button_active');
  });

  const imageButton = elementElement.querySelector('.element__image-button');
  

  imageButton.addEventListener('click', ()=>{
    popupOpen(popupImage);
    popupImage.querySelector('.popup__image').src = imageButton.querySelector('.element__picture').src;
    popupImage.querySelector('.popup__image').alt = ('Картинка "'+ imageButton.closest('.element').querySelector('.element__title').textContent +'"');
    popupImage.querySelector('.popup__subtitle').textContent = imageButton.closest('.element').querySelector('.element__title').textContent;
  });
  return elementElement;
}

function editFormSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupClose(popupEdit);   
}

function addFormSubmitHandler (evt) {
  evt.preventDefault(); 

  const object = {
    link: linkInput.value,
    name: titleInput.value
  };
 
  elements.prepend(cardOutput(object));
  popupClose(popupAdd);
  popupAdd.querySelector('.popup__form').reset();

  const submitButton =popupAdd.querySelector('.popup__submit')
  submitButton.classList.add('popup__submit_inactive');
  submitButton.disabled = true;
}

// Функция для установки слушателей на попапы для закрытия по клику вне контента
function setClickExitListener(popupElement) {
  popupElement.addEventListener('click', (evt) => {
      if (evt.target === popupElement) {
          popupClose(popupElement);
      }
  });
}

editButton.addEventListener('click',() => popupOpen(popupEdit));
nameInput.value = profileName.textContent;
jobInput.value = profileProfession.textContent;
popupEditExitBtn.addEventListener('click',() => popupClose(popupEdit));

addButton.addEventListener('click', () => popupOpen(popupAdd));
popupAddExitBtn.addEventListener('click' ,() => popupClose(popupAdd));

popupImageExitBtn.addEventListener('click',() => popupClose(popupImage));
initialCards.forEach((item)=>{
  elements.append(cardOutput(item));
});

// Установка обработчиков на попапы для закрытия по нажатию Esc

// Установка обработчиков на попапы для закрытия по клику вне контента
setClickExitListener(popupAdd);
setClickExitListener(popupEdit);
setClickExitListener(popupImage);

// Установка обработчиков на кноаки отправки формы
popupAddContainer.addEventListener('submit', addFormSubmitHandler);
popupEditContainer.addEventListener('submit', editFormSubmitHandler);

