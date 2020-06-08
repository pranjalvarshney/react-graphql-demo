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
export const SignIn_User = gql`
    mutation($username: String!,$password: String ){
        signInUser(userInput2:{
        username: $username,
        password: $password
        }){
        token
        }
    }
`

export const Add_New_User = gql`
    mutation($username: String!, $email: String!,$password: String ){
        signUpUser(userInput:{
        username: $username,
        email: $email,
        password: $password
        }){
        token
        }
    }
`

export const getCurrent_User = gql`
    query{
        getCurrentUser{
            username
            joindate
            email
        }
    }
`