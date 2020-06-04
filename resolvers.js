const Recipe = require('./models/recipe')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.resolvers = {
    Query: {
        getAllRecipes: ()=>{   
            return Recipe.find({})
        },
    },

    Mutation: {
        addRecipe: (root, args) => { 
            const newRecipe = new Recipe({
                name: args.recipeInput.name,
                description: args.recipeInput.description,
                category: args.recipeInput.category,
                instructions: args.recipeInput.instructions,
                createdDate: args.recipeInput.createdDate,
                username: args.recipeInput.username
            })
            return newRecipe
                .save()
                .then(result=>{
                    return {...result._doc}
                })
                .catch(err => console.log(err))
        },
        // addUser: (root,args) => {
            
        //     bcrypt.hash(args.userInput.password,10,function(err,hash){
        //         const newUser = new User({
        //             name: args.userInput.name,
        //             email: args.userInput.email,
        //             username: args.userInput.username,
        //             password: hash,  
        //         })
        //         return newUser
        //             .save()
        //             .then(result=>{
        //                 return {...result._doc, password:null}
        //             })
        //             .catch(err => console.log(err))    
        //     })
        //     return bcrypt
        // }
    }

}