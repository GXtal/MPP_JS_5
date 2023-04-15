const graphql = require("graphql");
const {userDataType} = require("../types/user-type");
const {authInputType} = require("../inputs/user-input");
const userService = require("../../service/user-service")

const userMutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields:{
        login: {
            type: userDataType,
            args:{
                authInput: {type: new graphql.GraphQLNonNull(authInputType)}
            },
            resolve: async (_, {authInput}) => {
                const userData = await userService.login(authInput.nickname, authInput.password)
                return userData
            }
        },
        registration: {
            type: userDataType,
            args:{
                authInput: {type: new graphql.GraphQLNonNull(authInputType)}
            },
            resolve: async (_, {authInput}) => {
                const userData = await userService.registration(authInput.nickname,
                    authInput.password, authInput.isAdmin)
                return userData
            }
        },
        logout: {
            type: graphql.GraphQLBoolean,
            args:{
                refreshToken: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, {refreshToken}) => {
                const success = await userService.logout(refreshToken)
                return success
            }
        },
        refresh: {
            type: userDataType,
            args:{
                refreshToken: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, {refreshToken}) => {
                const userData = await userService.refresh(refreshToken)
                return userData
            }
        },
    }
})

module.exports = userMutation