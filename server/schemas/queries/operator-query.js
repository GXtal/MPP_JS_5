const graphql = require("graphql/index");
const { operatorType } = require("../types/operator-type");
const operatorService = require("../../service/operators-service")

const getOperators = {
    type: new graphql.GraphQLList(operatorType),
    args: {
        owner: { type: graphql.GraphQLInt}
    },
    resolve: async (_, { owner }) => {
        console.log(owner);
        const operators = await operatorService.getAll(owner)
        return operators
    }
}

const getOperator = {
    type: operatorType,
    args: {
        id: { type: graphql.GraphQLInt },
        owner: { type: graphql.GraphQLInt }
    },
    resolve: async (_, { id,owner }) => {
        console.log(id, owner);
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