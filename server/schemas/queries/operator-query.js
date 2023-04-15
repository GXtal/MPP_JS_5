const graphql = require("graphql/index");
const { operatorType } = require("../types/operator-type");
const operatorService = require("../../service/operators-service")

const getOperators = {
    type: new graphql.GraphQLList(operatorType),
    args: {
        owner: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
    },
    resolve: async (_, { owner }) => {
        const operators = await operatorService.getAll(owner)
        return operators
    }
}

const getOperator = {
    type: operatorType,
    args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        owner: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
    },
    resolve: async (_, { id,owner }) => {
        const operator = await operatorService.get(id,owner)
        return operator
    }
}

const operatorQuery = new graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        getOperator,
        getOperators,
    }
})

module.exports = operatorQuery;