import * as z from "zod";

export const authSchema = z.object({
   username: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(64, "Must be at most 64 characters")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val),
      "Must be a valid username or email"
    ),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      "Password must contain at least 1 uppercase letter and 1 number"
    ),

});
export type FormData = z.infer<typeof authSchema>;


export const registerSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .max(64, "Email must be at most 64 characters")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), { message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      "Password must contain at least 1 uppercase letter and 1 number"
    ),
});
export type RegisterFormData = z.infer<typeof registerSchema>;