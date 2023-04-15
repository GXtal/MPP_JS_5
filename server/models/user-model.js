class UserModel {

    id = 0;
    nickname = "";
    password = "";
    //holder = 0;
    constructor(id, nickname, password) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        //this.holder = holder;
    }

}
module.exports = UserModel;