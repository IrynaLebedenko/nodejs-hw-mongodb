import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': `Username should have at least ${3} characters`,
        'string.max': `Username should have at most ${20} characters`,
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal').required().default('personal'),
    // createdAt: Joi.date().iso().timestamp(true),
    // updatedAt: Joi.date().iso().timestamp(true),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
    // createdAt: Joi.date().iso().timestamp(true),
    // updatedAt: Joi.date().iso().timestamp(true),
});