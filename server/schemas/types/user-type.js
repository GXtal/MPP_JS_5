const graphql = require('graphql')

const userType = new graphql.GraphQLObjectType({
    name: "User",
    fields:{
        id: {type: graphql.GraphQLString},
        nickname: {type: graphql.GraphQLString},
        
    }
})

const userDataType = new graphql.GraphQLObjectType({
    name: "UserData",
    fields: {
        user: {type: userType},
        accessToken: {type: graphql.GraphQLString},
        refreshToken: {type: graphql.GraphQLString},        
    }
})

module.exports = {userType, userDataType}