/*=== Register Validation ===*/
const validateRegInputs = ({name, email, password}) => {
    let errors = {}
    // let {name, email, password} = args

    // name
    if (name.trim() === '') {
        errors.name = 'Name shouldn\'t be empty'
    }
    // email
    if (email.trim() === '') {
        errors.email = 'Email shouldn\'t be empty'
    } else {
        const regX = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regX)) {
            errors.email = 'Email must be valid'
        }
    }
    // password
    if (password.trim() === '') {
        errors.password = 'Password shouldn\'t be empty'
    } else {
        if (password.length < 6) {
            // console.log(password, password.length)
            errors.password = 'Password should be minimum 6 char long'
        }
    }

    // return
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


/*=== Login Validation ===*/
const validateLoginInputs = ({ email, password }) => {
    let errors = {}

    // email
    if (email.trim() === '') {
        errors.email = 'Email shouldn\'t be empty'
    } else {
        const regX = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regX)) {
            errors.email = 'Email must be valid'
        }
    }
    // password
    if (password.trim() === '') {
        errors.password = 'Password shouldn\'t be empty'
    } else {
        if (password.length < 6) {
            errors.password = 'Password should be minimum 6 char long'
        }
    }

    // return
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = {
    validateRegInputs,
    validateLoginInputs
}