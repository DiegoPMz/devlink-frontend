import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";
import {
  authEmailSchema,
  registerConfirmPassword,
  registerPasswordSchema,
} from "@/schemas/auth-schemas";
import { useStoreApp } from "@/store";
import { ApiRegisterBody } from "@/types/api-request-body";
import schemaValidator from "@/utilities/schema-validator";
import { useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { PiLockKeyFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

type ApiRegisterBodyKeys = keyof ApiRegisterBody;

interface ErrorStructure {
  err: boolean;
  message: string | undefined;
}
type LoginErrorState = Record<ApiRegisterBodyKeys, ErrorStructure>;

const INITIAL_STATE: ApiRegisterBody = {
  email: "",
  password: "",
  confirm_password: "",
};

const ERROR_STRUCTURE = {
  err: false,
  message: undefined,
};

const ERROR_INITIAL_STATE: LoginErrorState = {
  email: ERROR_STRUCTURE,
  password: ERROR_STRUCTURE,
  confirm_password: ERROR_STRUCTURE,
};

export const RegisterPage = () => {
  const [registerData, setRegisterData] =
    useState<ApiRegisterBody>(INITIAL_STATE);
  const [error, setError] = useState<LoginErrorState>(ERROR_INITIAL_STATE);

  const storeSignupMethod = useStoreApp((state) => state.signup);
  const navigate = useNavigate();

  const captureErrors = (state: ApiRegisterBodyKeys, value: string) => {
    if (state !== "confirm_password") {
      const schemaDictionary = {
        email: authEmailSchema,
        password: registerPasswordSchema,
      };

      const pickSchema = schemaDictionary[state];
      const { isError, schemaError } = schemaValidator(pickSchema, value);

      const newError: ErrorStructure = {
        err: true,
        message: schemaError?._errors[0],
      };

      isError
        ? setError({
            ...error,
            [state]: newError,
          })
        : setError({ ...error, [state]: ERROR_STRUCTURE });
    }

    if (state === "confirm_password" && registerData.password.length > 0) {
      const { isError, schemaError } = schemaValidator(
        registerConfirmPassword(registerData.password),
        value,
      );

      const newError: ErrorStructure = {
        err: true,
        message: schemaError?._errors[0],
      };

      isError
        ? setError({
            ...error,
            [state]: newError,
          })
        : setError({ ...error, [state]: ERROR_STRUCTURE });
    }
  };

  const handleChange = (
    stateName: ApiRegisterBodyKeys,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = e.target.value;

    setRegisterData({
      ...registerData,
      [stateName]: inputValue,
    });

    captureErrors(stateName, inputValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, confirm_password } = error;
    if (email.err || password.err || confirm_password.err) return;

    const isRegistered = await storeSignupMethod(registerData);
    if (isRegistered) navigate("/links");
  };

  const validateDisabledButton = () => {
    const emptyState = Object.values(registerData).some((val) => !val);
    const someError = Object.values(error).some((state) => state.err === true);
    return emptyState || someError;
  };

  return (
    <div className="lg:bg-appCustom min-h-[100dvh] bg-white p-[32px] md:flex md:flex-col md:items-center md:justify-center md:gap-[32px] md:bg-appGreyL">
      <div>
        <LogoDevlinksLarge />
      </div>
      <div className="flex flex-col gap-[30px] pt-[60px] md:w-[476px] md:rounded-xl md:bg-white md:p-[34px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="text-2xl font-bold text-appGreyD"> Create account </h1>
          <p className="text-appGrey">
            Let’s get you started sharing your links!
          </p>
        </div>
        <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs text-appGreyD" htmlFor="Email address">
              Email address
            </label>
            <AppTextField
              placeholder="e.g. alex@email.com"
              value={registerData.email}
              onChange={(e) => handleChange("email", e)}
              icon={<AiTwotoneMail />}
              error={error.email.message}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="create password">
              Create password
            </label>
            <AppTextField
              type="password"
              placeholder="At least .8 characters"
              value={registerData.password}
              onChange={(e) => handleChange("password", e)}
              icon={<PiLockKeyFill />}
              error={error.password.message}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="confirm password">
              Confirm password
            </label>
            <AppTextField
              type="password"
              placeholder="At least .8 characters"
              value={registerData.confirm_password}
              onChange={(e) => handleChange("confirm_password", e)}
              icon={<PiLockKeyFill />}
              error={error.confirm_password.message}
            />
          </div>

          <span className="text-xs text-appGrey">
            Password must contain at least 8 characters
          </span>

          <AppButton type="submit" disabled={validateDisabledButton()}>
            Create new account
          </AppButton>

          <div className="flex flex-col items-center md:flex-row md:justify-center">
            <span className="text-appGrey">Already have an account?</span>
            <Link className="text-appPurple" to={"/"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
