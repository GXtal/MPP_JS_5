const graphql = require("graphql");
const {userDataType, userType} = require("../types/user-type");
const {authInputType} = require("../inputs/user-input");
const userService = require("../../service/user-service")

const userQuery = new graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        getUser: {
            type: userType,
            args:{
                id: {type: graphql.GraphQLInt}
            },
            resolve: async (_, {id}) => {
                const user = await userService.getUser(id)
                return user
            }
        }
    }
})

module.exports = userQuery