import { RegisterOptions, UseFormWatch } from "react-hook-form";
import { RegisterUserPage } from "../index";

export function inputUserEmailValidations() {
  const inputUserEmail: RegisterOptions<RegisterUserPage, "email"> = {
    required: {
      value: true,
      message: "Can’t be empty",
    },
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Invalid e-mail address",
    },
  };

  return inputUserEmail;
}

export function inputUserPasswordValidations() {
  const inputUserPassword: RegisterOptions<RegisterUserPage, "password"> = {
    required: {
      value: true,
      message: "Can’t be empty",
    },
    minLength: {
      value: 8,
      message: "Must be at least 8 characters",
    },
  };

  return inputUserPassword;
}

export function inputUserConfirmPasswordValidations(
  watch: UseFormWatch<RegisterUserPage>,
) {
  const inputUserConfirmPassword: RegisterOptions<
    RegisterUserPage,
    "confirmPassword"
  > = {
    required: {
      value: true,
      message: "Please check again",
    },
    validate: (value) => {
      const inputPasswordValue = watch("password");
      if (value !== inputPasswordValue) return "Please check again";

      return true;
    },
  };

  return inputUserConfirmPassword;
}
