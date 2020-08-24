const validator = require('validator');
const validText = input => typeof input === 'string';

module.exports = function validateRegisterInput(data) {
    const errors = {};
    const { name, email, mobile, password, confirmPassword } = data;

    if (!validText(name) || name.split(' ').length <= 1) {
        errors.name = 'Full name is required';
    }

    if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid';
    }

    if (!validator.isMobilePhone(mobile)) {
        errors.mobile = 'Mobile phone number is invalid';
    }

    if (!validator.isLength(password, { min: 6, max: 20 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!validator.isLength(confirmPassword, { min: 6, max: 20 })) {
        errors.confirmPassword = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
    }

    const valid = Object.keys(errors).length === 0;
    return { errors, valid };
};