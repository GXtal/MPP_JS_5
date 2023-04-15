const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('../service/token-service')
const ApiError = require('../middleware/errors')
const path=require('path');
const fs = require('fs')

const usersDB = path.resolve(__dirname, "users.json")

class UserService {

    usersjson = '[]';

    users = [];

    maxId = 0;

    constructor() {

        try {
            this.usersjson = fs.readFileSync(usersDB, "utf8");
        } catch(error) {
            console.error(error);
        }

        this.users = JSON.parse(this.usersjson);

        console.log("users");
        console.log(this.users);

        this.users.forEach((x) => {
            if (x.id > this.maxId) {
                this.maxId = x.id
            }
        })
    }

    async registration(nickname, password) {

        if (this.users.findIndex((x) => x.nickname === nickname) != -1) {
            throw ApiError.BadRequest('User with nickname ' + nickname + ' is already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        let id = ++this.maxId;

        const user = new UserModel(id, nickname, hashPassword);
        this.users.push(user);

        this.usersjson = JSON.stringify(this.users);
        fs.writeFileSync(usersDB, this.usersjson);

        const tokens = tokenService.generateTokens({ ...user });
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: user
        }
    }

    async login(nickname, password) {

        const index = this.users.findIndex((x) => {
            console.log(x);
            return (x.nickname === nickname)});
        console.log(index);
        if (index == -1) {
            throw ApiError.BadRequest('No user with such nickname')
        }

        const user = this.users[index];
        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password')
        }

        const tokens = tokenService.generateTokens({ ...user })

        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: user
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const tokenData = await tokenService.findToken(refreshToken)
        if (!userData || !tokenData) {
            return ApiError.UnauthorizedError()
        }
        const index = this.users.findIndex((x) => x.id === userData.id);
        if (index == -1) {
            throw ApiError.BadRequest('No user with such nickname')
        }
        const user = this.users[index];
        const tokens = tokenService.generateTokens({ ...user })

        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: user
        }
    }
}

module.exports = new UserService()