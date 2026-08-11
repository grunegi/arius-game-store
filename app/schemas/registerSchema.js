import { z } from "zod";

export const registerSchema = z.object({
    username: z
      .string()
      .min(3, "username most be atleast 3 characters"),

    email: z
      .email("invalivd email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[0-9]/, "Password must contain a number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character."),

    terms: z.boolean().refine((value) => value === true, {
        message: "you most accept terms, privecy."
    }),
});