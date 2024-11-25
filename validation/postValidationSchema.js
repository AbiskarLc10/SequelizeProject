const { z } = require("zod");


const postSchema = z.object({
    title: z.string().min(5,"Title must have at least 5 characters"),
    content: z.string().min(10,"Content must have at least 10 characters")
})


module.exports = postSchema