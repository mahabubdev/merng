const bcrypt = require('bcryptjs')

/*=== Generate password hashed ===*/
async function hashPassword (pwd) {
    let salt = await bcrypt.genSalt(16)
    let hashingPwd = await bcrypt.hash(pwd, salt)
    return hashingPwd
}


/*=== Compare hashed password ===*/
async function comparePassword (pwd, hashedPwd) {
    let status = await bcrypt.compare(pwd, hashedPwd)
    return status
}



module.exports = {
    hashPassword,
    comparePassword
}