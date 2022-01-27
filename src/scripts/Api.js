export default class Api {
    constructor ({baseUrl, token}, renderLoading) {
        this._baseUrl = baseUrl;
        this._token = token;
        this._renderLoading = renderLoading;
    }

    getProfileInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
        headers: {
            authorization: this._token}
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }); 
    }

    patchProfileInfo (newName, newAbout) {
        this._renderLoading(true,'.popup_for_edit-button')
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        })
        .then(res=>res.json())
        .catch((err) => {
            console.log(err);
        })
        .finally(()=>this._renderLoading(false,'.popup_for_edit-button'))
    }

    getCardsData () {
        return fetch(`${this._baseUrl}/cards`, {
        headers: {
            authorization: this._token}
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }) 
    }

    makeNewCardData (name, link) {
        this._renderLoading(true,'.popup_for_add-button')
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }) 
        .finally(()=>{
            this._renderLoading(false,'.popup_for_add-button');
        })
    }

    deleteCardData (cardId) {
       return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })  
    }

    makeLike (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }) 
    }

    deleteLike(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }) 
    }

    patchAvatar(link){
        this._renderLoading(true,'.popup_for_avatar')
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
              })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        }) 
        .finally(()=>{
            this._renderLoading(false,'.popup_for_avatar')
        })
    }
}