import {gql} from "@apollo/client";

export const ADD_OPERATOR = gql`
    mutation addOperator($owner: Int!){
        addOperator(owner: $owner){
            id, name, rarity, type
        }
    }
`

export const SET_OPERATOR = gql`
    mutation setOperator($id: Int, $owner: Int, $input: OperatorInput!){
        setOperator(id: $id, owner:$owner,operatorInput: $input){
            id, owner, name, type, rarity, level, elite
        }
    }
`

export const DELETE_OPERATOR = gql`
    mutation deleteOperator($id: Int, $owner: Int){
        deleteOperator(id: $id, owner: $owner){
            id, name, rarity, type
        }
    }
`