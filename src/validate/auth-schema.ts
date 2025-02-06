import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Invalid email address",
    })
    .email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const signupSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Invalid email address",
    })
    .email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." }),
});
