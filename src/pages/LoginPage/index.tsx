import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";
import { authEmailSchema, createPasswordSchema } from "@/schemas/auth-schemas";
import { useStoreApp } from "@/store";
import schemaValidator from "@/utilities/schema-validator";
import { useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { PiLockKeyFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export interface LoginState {
  email: string;
  password: string;
}
type LoginStateKeys = keyof LoginState;

interface ErrorStructure {
  err: boolean;
  message: string | undefined;
}
type LoginErrorState = Record<LoginStateKeys, ErrorStructure>;

const INITIAL_STATE: LoginState = {
  email: "",
  password: "",
};
const ERROR_STRUCTURE = {
  err: false,
  message: undefined,
};
const ERROR_INITIAL_STATE: LoginErrorState = {
  email: ERROR_STRUCTURE,
  password: ERROR_STRUCTURE,
};

export const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginState>(INITIAL_STATE);
  const [error, setError] = useState<LoginErrorState>(ERROR_INITIAL_STATE);

  const storeLoginMethod = useStoreApp((state) => state.login);
  const navigate = useNavigate();

  const captureErrors = (state: LoginStateKeys, value: string) => {
    const schemaDictionary = {
      email: authEmailSchema,
      password: createPasswordSchema("password"),
    };

    const pickSchema = schemaDictionary[state];
    const { isError, schemaError } = schemaValidator(pickSchema, value);

    if (isError) {
      const newError: ErrorStructure = {
        err: true,
        message: schemaError?._errors[0],
      };

      setError({
        ...error,
        [state]: newError,
      });
      return;
    }

    setError({ ...error, [state]: ERROR_STRUCTURE });
  };

  const handleChange = (
    stateName: LoginStateKeys,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = e.target.value;

    setLoginData({
      ...loginData,
      [stateName]: inputValue,
    });

    captureErrors(stateName, inputValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = error;
    if (email.err || password.err) return;

    const isAuthenticated = await storeLoginMethod(loginData);
    if (isAuthenticated) navigate("/links");
  };

  const validateDisabledButton = Object.values(loginData).some(
    (state) => !state,
  );

  return (
    <div className="md:bg-appCustom h-[100dvh] bg-white p-[32px] md:flex md:flex-col md:items-center md:justify-center md:gap-[32px] md:bg-appGreyL">
      <div>
        <LogoDevlinksLarge />
      </div>
      <div className="flex flex-col gap-[30px] pt-[60px] md:w-[476px] md:rounded-xl md:bg-white md:p-[34px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="text-2xl font-bold text-appGreyD"> Login </h1>
          <p className="text-appGrey">
            Add your details below to get back into the app
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div>
            <label className="text-xs text-appGreyD" htmlFor="Email address">
              Email address
            </label>
            <AppTextField
              name="email"
              value={loginData.email}
              onChange={(e) => handleChange("email", e)}
              placeholder="e.g. alex@email.com"
              icon={<AiTwotoneMail />}
              error={error.email.message}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="Password">
              Password
            </label>
            <AppTextField
              type="password"
              value={loginData.password}
              onChange={(e) => handleChange("password", e)}
              placeholder="Enter your password"
              icon={<PiLockKeyFill />}
              error={error.password.message}
            />
          </div>

          <AppButton type="submit" disabled={validateDisabledButton}>
            Login
          </AppButton>

          <div className="flex flex-col items-center md:flex-row md:justify-center">
            <span className="text-appGrey">Don’t have an account?</span>
            <Link className="text-appPurple" to={"/signup"}>
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
