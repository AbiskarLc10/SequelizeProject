const { z } = require("zod");


const signUpSchema = z.object({
    firstName: z.string().min(3,"First Name must have at least 3 characters"),
    lastName: z.string().min(3,"Last Name must have at least 3 characters"),
    email: z.string().email("Not a valid email address"),
    password: z.string().min(6,"Password must have at least 6 characters")
})


const updateUserSchema = z.object({
    firstName: z.string().min(3,"First Name must have at least 3 characters").optional(),
    lastName: z.string().min(3,"Last Name must have at least 3 characters").optional(),
    email: z.string().email("Not a valid email address").optional(),
    password: z.string().min(6,"Password must have at least 6 characters").optional(),
    profileImage: z.string().optional()
})


module.exports = {
    signUpSchema,
    updateUserSchema
}