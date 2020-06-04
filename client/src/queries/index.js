import { gql } from 'apollo-boost'

export const getALLRecipe = gql`
    query{
        getAllRecipes{
            name
            category
            description
            instructions
            username
            createdDate
            likes
        }
    }
`