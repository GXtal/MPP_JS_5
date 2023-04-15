const graphql = require("graphql");
const operatorService = require("../../service/operators-service");
const {operatorType} = require("../types/operator-type");
const {operatorInputType} = require("../inputs/operator-input");

const setOperator = {
    type: operatorType,
    args:{
        id: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
        owner: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
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
        const operator = await operatorService.add(owner)
        return operator
    }
}

const deleteOperator = {
    type: new graphql.GraphQLList(operatorType),
    args:{
        id: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
        owner: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
    },
    resolve: async (_, {id}) => {
        const operator = await operatorService.delete(id, owner)
        return operator
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