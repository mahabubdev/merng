const { gql } = require('apollo-server-express')

module.exports = gql`
    type Query {
        hello: Hello!
        allUsers: [Users!]
        user(id: String!): Users
    }

    # types =======================>
    type Hello {
        msg: String!
    }

    # Users
    type Users {
        id: ID!
        name: String!
        email: String!
    }

    # user
    type User {
        id: ID!
        name: String!
        email: String!
        token: String!
    }



    # Inputs
    input LoginInputs {
        email: String!
        password: String!
    }
    input RegInputs {
        name: String!
        email: String!
        password: String!
    }




    # ==============> MUTATIONS <================
    type Mutation {
        createUser(regInputs: RegInputs): User
        loginUser(loginInputs: LoginInputs): User
    }
`;