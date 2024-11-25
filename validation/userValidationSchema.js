const { z } = require("zod");


const signUpSchema = z.object({
    username: z.string().min(4,"Username must have at least 4 characters"),
    email: z.string().email("Not a valid email address"),
    password: z.string().min(6,"Password must have at least 6 characters")
})


const updateUserSchema = z.object({
    username: z.string().min(4,"Username must have at least 4 characters").optional(),
    email: z.string().email("Not a valid email address").optional(),
    password: z.string().min(6,"Password must have at least 6 characters").optional(),
    profileImg: z.string().optional()
})


module.exports = {
    signUpSchema,
    updateUserSchema
}