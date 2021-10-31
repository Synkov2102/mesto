console.log('Hello!');

let form = document.querySelector('.form');
let exitButton = form.querySelector('.form__exit-button');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
function edit(){
    form.classList.add('form__opened');
}
function remove(){
    form.classList.remove('form__opened');
}

editButton.addEventListener('click', edit);
exitButton.addEventListener('click', remove);


let nameInput = form.querySelector('.form__input_type_name');
let jobInput = form.querySelector('.form__input_type_profession');

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
form.addEventListener('submit', formSubmitHandler);
