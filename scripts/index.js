//Массив данных для карточек
let initialCards = [
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

//Заполнение карточек и вывод их на страницу
const cardsOutput = (initialCards) =>{
  let buffer = initialCards.filter((item)=>{
    return item != undefined
  })
  initialCards = buffer.filter((item)=>{
    return item != undefined
  })
  initialCards.forEach((item) => {
    const elementTemplate = document.querySelector('#element').content;
    const elements = document.querySelector('.elements');
    // клонируем содержимое тега template
    const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

    // наполняем содержимым
    elementElement.querySelector('.element__picture').src = item.link;
    elementElement.querySelector('.element__title').textContent = item.name;

    // отображаем на странице
    elements.append(elementElement);
    
  });         
};

//Функция удаления карточек
const cardsDelete = () =>{
  let htmlCollection = document.getElementsByClassName('element__delete-button');
  let deleteButton = Array.from(htmlCollection); 

  for(let i=0; i < deleteButton.length; i++){
    deleteButton[i].addEventListener('click', ()=>{
      let element = deleteButton[i].parentNode;
      element.remove();
    });
  }
}  

const cardsLike = () =>{
  let likeHtmlCollection = document.getElementsByClassName('element__like-button');
  let likeButton = Array.from(likeHtmlCollection); 
  likeButton.forEach((item)=>{
    item.addEventListener('click', ()=>{
      console.log('Клик');
      item.classList.toggle('element__like-button_active');
    });
  });
}  

//Переменные для попапов
let popupEdit = document.querySelector('.popup_for_edit-button');
let popupAdd = document.querySelector('.popup_for_add-button');
let popupImage = document.querySelector('.popup_for_image');

//Переменные для контейнеров в попапах
let popupEditContainer = popupEdit.querySelector('.popup__container');
let popupAddContainer = popupAdd.querySelector('.popup__container');
let popupImageContainer = popupImage.querySelector('.popup__container')

//Кнопки закрытия попапов
let exitButtonForEdit = popupEdit.querySelector('.popup__exit-button');
let exitButtonForAdd = popupAdd.querySelector('.popup__exit-button');
let exitButtonForImage =popupImage.querySelector('.popup__exit-button');

let profile = document.querySelector('.profile');

//Кнопки открытия форм
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button')

function imagePopup(){
  let imageHtmlCollection = document.getElementsByClassName('element__image-button');
  let imageButton = Array.from(imageHtmlCollection);

  imageButton.forEach((item)=>{
    item.addEventListener('click', ()=>{
      popupImage.classList.add('popup_open');
      popupImage.querySelector('.popup__image').src=item.querySelector('.element__picture').src;
      popupImage.querySelector('.popup__subtitle').textContent = item.closest('.element').querySelector('.element__title').textContent;
    });
  });  
  
  exitButtonForImage.addEventListener('click',() =>{
    popupImage.classList.remove('popup_open');
  });
}

//Реализация открытия и закрытия для формы редактирования профиля
editButton.addEventListener('click',() =>{
  popupEdit.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
});

exitButtonForEdit.addEventListener('click',() =>{
  popupEdit.classList.remove('popup_open');
});


//Реализация открытия и закрытия для формы добавления карточек
addButton.addEventListener('click',() =>{
  popupAdd.classList.add('popup_open');
});

exitButtonForAdd.addEventListener('click',() =>{
  popupAdd.classList.remove('popup_open');
});


// Переменный полей попапов
let nameInput = popupEdit.querySelector('.popup__input_type_name');
let jobInput = popupEdit.querySelector('.popup__input_type_profession');
let titleInput = popupAdd.querySelector('.popup__input_type_title');
let linkInput = popupAdd.querySelector('.popup__input_type_link');

// Переменные имени и вида деятельности профиля на странице
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


function editFormSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupEdit.classList.remove('popup_open');   
}

function addFormSubmitHandler (evt) {
  evt.preventDefault(); 
  const elementTemplate = document.querySelector('#element').content;
  const elements = document.querySelector('.elements');
  // клонируем содержимое тега template
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  elementElement.querySelector('.element__picture').src = linkInput.value;
  elementElement.querySelector('.element__title').textContent = titleInput.value;

  // отображаем на странице
  elements.prepend(elementElement);

  cardsDelete();
  imagePopup();
  cardsLike();
  
  popupAdd.classList.remove('popup_open');
}


cardsOutput(initialCards);
cardsDelete();
imagePopup();
cardsLike();

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupAddContainer.addEventListener('submit', addFormSubmitHandler);
popupEditContainer.addEventListener('submit', editFormSubmitHandler);

