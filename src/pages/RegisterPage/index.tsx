import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import { PiLockKeyFill } from "react-icons/pi";
import {
  inputUserConfirmPasswordValidations,
  inputUserEmailValidations,
  inputUserPasswordValidations,
} from "./validations/react-hook-validations";

export interface RegisterUserPage {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<RegisterUserPage>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function validateDisabledButton() {
    const inputs = watch();
    const areEmptyInputs =
      !inputs.email || !inputs.password || !inputs.confirmPassword;

    return areEmptyInputs;
  }

  // pending
  const onSubmit: SubmitHandler<RegisterUserPage> = () => {
    console.log("✅");
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
        <form
          className="flex flex-col gap-[24px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-xs text-appGreyD" htmlFor="Email address">
              Email address
            </label>
            <AppTextField
              id="Email address"
              placeholder="e.g. alex@email.com"
              icon={<AiTwotoneMail />}
              {...register("email", inputUserEmailValidations())}
              error={errors.email?.message ?? undefined}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="create password">
              Create password
            </label>
            <AppTextField
              type="password"
              id="Create password"
              placeholder="At least .8 characters"
              icon={<PiLockKeyFill />}
              {...register("password", inputUserPasswordValidations())}
              error={errors.password?.message ?? undefined}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="confirm password">
              Confirm password
            </label>
            <AppTextField
              type="password"
              id="confirm password"
              placeholder="At least .8 characters"
              icon={<PiLockKeyFill />}
              {...register(
                "confirmPassword",
                inputUserConfirmPasswordValidations(watch),
              )}
              error={errors.confirmPassword?.message ?? undefined}
            />
          </div>

          <span className="text-xs text-appGrey">
            Password must contain at least 8 characters
          </span>

          <AppButton type="submit" disabled={validateDisabledButton()}>
            Create new account
          </AppButton>

          <div className="flex flex-col items-center md:flex-row md:justify-center">
            <a className="text-appGrey" href="#">
              Already have an account?
            </a>
            <a className="text-appPurple" href="#">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
