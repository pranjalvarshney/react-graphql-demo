const Recipe = require('./models/recipe')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (user,secret,expiresIn)=>{
    
    const {username, email} = user

    return jwt.sign({username,email},secret,{expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: ()=>{   
            return Recipe.find({})
        },
    },

    Mutation: {
        addRecipe: async (root, args) => { 
            try {
                const newRecipe = await new Recipe({
                    name: args.recipeInput.name,
                    description: args.recipeInput.description,
                    category: args.recipeInput.category,
                    instructions: args.recipeInput.instructions,
                    createdDate: args.recipeInput.createdDate,
                    username: args.recipeInput.username
                })
                newRecipe.save()
                return newRecipe
            } catch (error) {
                console.log(error)
            }
        },
        signInUser: async( root, args) => {
            try {
                const user = await User.findOne({username: args.userInput2.username})
                if(!user){
                    throw new Error("User not found")
                }
                else{
                    const isPasswordValid = await bcrypt.compare(args.userInput2.password, user.password)
                    if(!isPasswordValid){
                        throw new Error("Invalid Password")
                    }
                    else{
                        return { token : createToken(user,"asdasdjaoisjdoiasdasdijaoisdjoaasda","1hr")}
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        signUpUser: async (root, args)=> {
           try {
            const user = await User.findOne({username: args.userInput.username})
            if(user){
               throw new Error("User already exists") 
            }
            else{
                
                const newUser = await new User({
                    username: args.userInput.username,
                    email: args.userInput.email,
                    password: args.userInput.password
                }).save()
                return { token : createToken(newUser,"asdasdjaoisjdoiasdasdijaoisdjoaasda","1hr")}
            }
                 
               
           } catch (error) {
               console.log(error)
           }

            }
        
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