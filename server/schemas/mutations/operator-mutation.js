const graphql = require("graphql");
const operatorService = require("../../service/operators-service");
const {operatorType} = require("../types/operator-type");
const {operatorInputType} = require("../inputs/operator-input");

const setOperator = {
    type: operatorType,
    args:{
        id: {type: graphql.GraphQLInt},
        owner: {type: graphql.GraphQLInt},
        operatorInput: {type: new graphql.GraphQLNonNull(operatorInputType)}
    },
    resolve: async (_, {id,owner,operatorInput}) => {
        const operator = await operatorService.set(id,owner,operatorInput)
        return operator
    }
}

const addOperator = {
    type: new graphql.GraphQLList(operatorType),
    args:{
        owner: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
    },
    resolve: async (_, {owner}) => {
        const operators = await operatorService.add(owner)
        return operators
    }
}

const deleteOperator = {
    type: new graphql.GraphQLList(operatorType),
    args:{
        id: {type: graphql.GraphQLInt},
        owner: {type: graphql.GraphQLInt},
    },
    resolve: async (_, {id,owner}) => {
        console.log("on delte");
        const operators = await operatorService.delete(id, owner)
        return operators
    }
}

const operatorMutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields:{
        setOperator,
        deleteOperator,
        addOperator,
    }
})

module.exports = operatorMutation