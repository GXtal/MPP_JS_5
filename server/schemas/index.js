const graphql = require('graphql')
const userMutation = require('./mutations/user-mutation')
const userQuery = require('./queries/user-query')
const operatorMutation = require('./mutations/operator-mutation')
const operatorQuery = require('./queries/operator-query')

const userSchema = new graphql.GraphQLSchema({mutation: userMutation, query:userQuery})
const operatorSchema = new graphql.GraphQLSchema({mutation: operatorMutation, query: operatorQuery})

module.exports = {userSchema, operatorSchema}