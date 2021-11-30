//Функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

//Функция прячет ошибку
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

// Функция проверки конкретного поля
const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

// Функция установки слушателей с функцией проверки полей и блокировки кнопок
const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

// Функция запуска валидации
const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(obj.formElementSelector));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, obj);
        });
    });
};

//Функция проверки валидности ввода инпутов
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//Функция состояния кнопки
function toggleButtonState(inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

enableValidation({
    formSelector: '.popup__form',
    formElementSelector: '.popup__text-inputs',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});