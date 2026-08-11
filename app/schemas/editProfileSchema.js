import { z } from "zod";

export const editPeofileSchema = z.object({
    firstName: z
        .string()
        .min(3, "first name most be atleast 3 characters")
        .regex(
            /^[A-Za-z\s]+$/,
            "Last name can only contain letters and spaces."
        ),

    lastName: z
        .string()
        .min(3, "last name most be atleast 3 characters")
        .regex(
            /^[A-Za-z\s]+$/,
            "Last name can only contain letters and spaces."
        ),
    
    bio: z
        .string()
        .min(2, "Bio most be atleast 3 characters")
        .max(350, "you reached the limit")
        .regex(/^[A-Za-z\s'-]+$/)
})