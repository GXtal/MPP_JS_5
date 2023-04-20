import {gql} from "@apollo/client";

export const GET_OPERATORS = gql`
    query getOperators($owner: Int){
        getOperators(owner: $owner){
            id, name, rarity, type
        }
    }
`

export const GET_OPERATOR = gql`
    query getOperator($id: Int, $owner: Int){
        getOperator(id: $id, owner: $owner){
            id, owner, name, type, rarity, level, elite
        }
    }   
`