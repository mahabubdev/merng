const { AuthenticationError } = require('apollo-server-express')
const JWT = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'merng2021'

/*=== Generate JWT token ===*/
function generateJwt({ id, email }) {
    let generate = JWT.sign({
        id,
        email
    }, jwtSecret,
    {
        expiresIn: '12h'
    })

    return generate
}



/*=== Generate JWT token ===*/
function verifyJwt(ctx) {
    let reqHeaderToken = ctx.req.headers.authorization
    if (reqHeaderToken) {
        // Bearer
        let _token = reqHeaderToken.split('Bearer ')[1]
        if (_token) {
            try {
                let thisUser = JWT.verify(_token, jwtSecret)
                return thisUser
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired auth-token')
            }
        }
        throw new Error('Auth token must be Bearer [token]')
    }
    throw new Error('Authorization token not found')
}


module.exports = {
    generateJwt,
    verifyJwt
}