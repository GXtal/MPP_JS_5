const graphql = require('graphql')

const operatorInputType = new graphql.GraphQLInputObjectType({
    name: "OperatorInput",
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

module.exports = {operatorInputType}