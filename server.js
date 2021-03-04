const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const mongoose = require('mongoose')
const { typeDefs, resolvers } = require('./graphql')

// dotenv
require('dotenv').config()

// app
const app = express()
app.use(express.json())

// mongo
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log(`MongoDB is connected`))

// apollo-server
const apolloServer = new ApolloServer({ typeDefs, resolvers })
apolloServer.applyMiddleware({ app })


// http-server
app.listen(process.env.PORT || 5001, () => console.log(`Server is on ${process.env.PORT || 5001}`))