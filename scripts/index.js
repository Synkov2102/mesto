let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let exitButton = popup.querySelector('.popup__exit-button');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
function edit(){
    popup.classList.add('popup_condition_opened');
}
function remove(){
    popup.classList.remove('popup_condition_opened');
}

editButton.addEventListener('click', edit);
exitButton.addEventListener('click', remove);


let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_profession');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

nameInput.value = profileName.textContent;
jobInput.value = profileProfession.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;

    remove();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler);
