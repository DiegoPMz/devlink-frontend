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

export const registerPasswordSchema = z
  .string({ message: "Password is required" })
  .trim()
  .min(8, { message: "Minimum 8 characters" });

export const registerConfirmPassword = (password: string) => {
  return z
    .string({ message: "This field is required" })
    .min(1, { message: "This field cannot be empty" })
    .trim()
    .refine((state) => state === password, {
      message: "Passwords must match",
    });
};
