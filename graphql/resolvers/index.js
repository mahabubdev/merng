const user = require('./user')

module.exports = {
    Query: {
        hello: () => {
            const msg = {msg: "Hello Apollo!"}
            return msg
        },
        ...user.Query
    },

    Mutation: {
        ...user.Mutation
    }
}