const Joi = require("@hapi/joi")

const authSchema = Joi.object().keys({
    username: Joi.string()
    .lowercase()
    .required()
    .label('Username is required '),

    email: Joi.string()
    .email()
    .lowercase()
    .required()
    .label('Email must be valid'),

    password: Joi.string()
    .min(5)
    .required()
    .label('Password length must exceed  and include atleast a number,a character,uppercase,lowercase, and a special character. eg:!$%'),
    phoneNumber: Joi.string(),
    role: Joi.string()
})

module.exports = authSchema