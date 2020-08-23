const validator = require('validator');

const validNum = input => typeof input === 'number';
const validText = input => typeof input === 'string';

module.exports = function validateRegisterInput(data) {
    const errors = {};
    const { name, email, mobile, password, confirmPassword } = data;

    if (validator.isEmpty(name)) errors.name = 'Name is required';
    if (validator.isEmpty(email)) errors.email = 'Email is required';
    if (validator.isEmpty(mobile)) errors.mobile = 'Mobile number is required';
    if (validator.isEmpty(password)) errors.password = 'Password is required';
    if (validator.isEmpty(confirmPassword)) errors.confirmPassword = 'Password confirmation is required';

    if (!validText(name) || name.split(' ').length <= 1) {
        errors.name = 'Please enter your full name';
    }

    if (!validator.isEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    const valid = Object.keys(errors) === 0;
    return { errors, valid };
};