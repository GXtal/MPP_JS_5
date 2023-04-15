class TokenModel {

    constructor(id, userId, refreshToken) {
        this.id = id;
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

}
module.exports = TokenModel;