const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')

const Recipe = require('./models/recipe')
const User = require('./models/user')
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const { makeExecutableSchema } = require('graphql-tools')

// allow cross site access
app.use(cors({ origin: "http://localhost:3000" , credentials: true})) 

// setup jwt authentication middleware
app.use(async (req,res,next) => {
    const token = req.headers.authorization
    console.log(token , typeof(token))
    if(token !== "null"){
        try {
            const currentUser = await jwt.verify(token,process.env.SECRET_KEY)
            console.log(currentUser)
            req.currentUser = currentUser
        } catch (error) {
            console.log(error)
        }
    }
    next()
})


app.use('/graphql',graphqlHTTP(({currentUser})=>({
    schema: makeExecutableSchema({ 
        typeDefs,
        resolvers
    }),
    context: {
        User,
        Recipe,
        currentUser
    },
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
    ,
    graphiql: true
})))


// mongodb connection
const uri = `mongodb+srv://${process.env.DBUser}:${process.env.DBPassword}@cluster0-rheoc.mongodb.net/DB?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo Connected Successfully")        
    })
    .catch(err =>{
        console.log(err)
    })
// Port selection
const PORT = process.env.PORT || 4000

// app-listen
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})