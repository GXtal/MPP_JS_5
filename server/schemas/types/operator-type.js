const graphql = require('graphql')

const operatorType = new graphql.GraphQLObjectType({
    name: "Operator",
    fields:{
        id: {type: graphql.GraphQLInt},
        owner: {type: graphql.GraphQLInt},
        name: {type: graphql.GraphQLString},
        type: {type: graphql.GraphQLString},
        rarity: {type: graphql.GraphQLInt},
        level: {type: graphql.GraphQLInt},        
        elite: {type: graphql.GraphQLInt},
    }
})

module.exports = {operatorType}