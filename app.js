const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')

const Recipe = require('./models/recipe')
const User = require('./models/user')
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const { makeExecutableSchema } = require('graphql-tools')

// Put together a schema

app.use(cors({ origin: "http://localhost:3000" , credentials: true}))

app.use('/graphql',graphqlHTTP({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    graphiql: true
}))

// // GraphiQL, a visual editor for queries
// app.use('/graphiql',graphiqlExpress({endpointURL: '/graphql'}))

// // The GraphQL endpoint
// app.use('/graphql',graphqlExpress({
//     schema,
//     context: {
//         Recipe,
//         User
//     }
// }))

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