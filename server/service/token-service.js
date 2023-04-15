const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {

    tokens = [];

    maxId=0;
    constructor() {
        this.tokens = [];
        this.tokens.forEach((x) => {
            if (x.id > this.maxId) {
                this.maxId = x.id
            }
        })
    }

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {

        const index = this.tokens.findIndex((x) => x.userId === userId);

        var token;

        if (index == -1) {

            let id = ++this.maxId;
            token = new TokenModel(id,userId,refreshToken);
            this.tokens.push(token);

        }
        else
        {
            token = this.tokens[index];
            token.refreshToken = refreshToken;
        }

        return token
    }
    async removeToken(refreshToken) {
        const index = this.tokens.findIndex((x) => x.refreshToken === refreshToken);
        this.tokens.splice(index, 1);
        return true;
    }

    validationAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validationRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        const index = this.tokens.findIndex((x) => x.refreshToken === refreshToken);

        const tokenData = this.tokens[index];
        return tokenData
    }
}

module.exports = new TokenService()
