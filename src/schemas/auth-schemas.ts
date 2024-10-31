import z from "zod";

export const createPasswordSchema = (fieldName: string) => {
  return z
    .string({ message: `${fieldName} is required` })
    .min(1, { message: `${fieldName} cannot be empty` })
    .trim();
};

export const authEmailSchema = z
  .string({ message: "Email is required" })
  .min(1, { message: "Email cannot be empty " })
  .email({ message: "Please enter a valid email address" });

export const loginSchema = z.object({
  email: authEmailSchema,
  password: createPasswordSchema("password"),
});

export const registerSchema = z
  .object({
    email: authEmailSchema,
    password: createPasswordSchema("password"),
    confirmPassword: createPasswordSchema("confirmPassword"),
  })
  .refine((state) => state.password === state.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
