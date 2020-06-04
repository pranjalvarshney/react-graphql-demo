
const Recipe = require('./models/recipe')
const User = require('./models/user')

exports.typeDefs =`

        type Recipe{
            _id: ID
            name: String!
            description: String!
            category: String!
            instructions: String!
            createdDate: String!
            likes: Int
            username: String!
        }
        type User{
            _id: ID
            name: String!
            username: String!
            password: String
            email: String!
            joinDate: String
            favorites: [Recipe]
        
            
        }

        input userInput{
            _id: ID
            name: String!
            username: String!
            email: String!
            password: String
        }

        input recipeInput {
            name: String!
            description: String!
            category: String!
            instructions: String!
            createdDate: String!
            username: String!
        }

        type Query{
            getAllRecipes: [Recipe],
        }

        type Token{
            token: String!
        }

        type Mutation {
            signUpUser(userInput: userInput) : Token!
            addRecipe(recipeInput: recipeInput): Recipe!
        }
`