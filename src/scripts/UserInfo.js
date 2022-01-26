export default class UserInfo {
    constructor ({nameSelector, professionSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector); 
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo () { 
        return {
            name: this._name.textContent,
            profession: this._profession.textContent
        }
    }

    setUserInfo (name, profession, avatarLink) {
        this._name.textContent = name;
        this._profession.textContent = profession;
        this._avatarSelector.style.backgroundImage = `url(${avatarLink})`;
    }
}