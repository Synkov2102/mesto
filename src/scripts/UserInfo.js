export default class UserInfo {
    constructor ({nameSelector, professionSelector}) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector); 
    }

    getUserInfo () { 
        const data = {
            name: this._name.textContent,
            profession: this._profession.textContent
        }

        return data
    }

    setUserInfo (name, profession) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    }
}