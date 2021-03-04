const { users } = require('../../models')
const { UserInputError } = require('apollo-server-express')
const {
    validateLoginInputs,
    validateRegInputs
} = require('../../utils/validator')
const { generateJwt, verifyJwt } = require('../../utils/token')
const { hashPassword, comparePassword } = require('../../utils/pwdHash')




/*--- Mutation: signin(Login) an user ---*/
const loginUser = async (parent, {loginInputs}) => {
    // validate data
    let { errors, valid } = await validateLoginInputs(loginInputs)
    if (!valid) {
        throw new UserInputError('Errors!', { errors })
    }

    // check user exists ?
    const findUser = await users.findOne({ email: loginInputs.email })
    if (!findUser) {
        throw new UserInputError('User not found!', {email: 'User not found, Error 404!'})
    }

    // check <-> compare password
    let checkPassword = await comparePassword(loginInputs.password, findUser.password)
    // console.log(checkPassword, findUser.password, loginInputs.password)
    if (checkPassword) {
        const jwt_token = generateJwt(findUser) // generate JWT
        let { _id, name, email } = findUser
        return {
            id: _id,
            name,
            email,
            token: jwt_token
        }
    } else {
        throw new UserInputError('Wrong Password', {password: 'Wrong Password!'})
    }
}





/*--- Mutation: create an user ---*/
const createUser = async (parent, {regInputs})  => {

    // validate data
    let { errors, valid } = await validateRegInputs(regInputs)
    if (!valid) {
        throw new UserInputError('Errors!', { errors })
    }

    // abort duplicate user
    const findUser = await users.findOne({ email: regInputs.email })
    if (findUser) {
        throw new UserInputError('User aleady exists!', {
            errors: {
                email: 'This email has been taken'
            }
        })
    }

    let passwordHash = await hashPassword(regInputs.password) // hashing password

    const newUser = new users({
        name: regInputs.name,
        email: regInputs.email,
        password: passwordHash
    })
    const saved = await newUser.save()
    const jwt_token = generateJwt(saved) // generate JWT
    // response
    let { _id, name, email } = saved
    return {
        id: _id,
        name,
        email,
        token: jwt_token
    }
}


// Query : allusers
const allUsers = async () => {
    let allUsers = await users.find({})
    return allUsers
}
// Query : an user only
const user = async (parent, { id }) => {
    let findUser = await users.findOne({ _id: id })
    return findUser
}




module.exports = {
    Query: {
        allUsers,
        user
    },

    Mutation: {
        createUser, // create user
        loginUser   // login user
    }
}