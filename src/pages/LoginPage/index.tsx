import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import { PiLockKeyFill } from "react-icons/pi";

export interface LoginUserPage {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<LoginUserPage>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function validateDisabledButton() {
    const inputs = watch();
    const areEmptyInputs = !inputs.email || !inputs.password;
    return areEmptyInputs;
  }

  // pending
  const onSubmit: SubmitHandler<LoginUserPage> = () => {
    console.log("✅");
  };

  return (
    <div className="lg:bg-appCustom h-[100dvh] bg-white p-[32px] md:flex md:flex-col md:items-center md:justify-center md:gap-[32px] md:bg-appGreyL">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px]"
        >
          <div>
            <label className="text-xs text-appGreyD" htmlFor="Email address">
              Email address
            </label>
            <AppTextField
              id="Email address"
              placeholder="e.g. alex@email.com"
              icon={<AiTwotoneMail />}
              {...register("email", {
                required: {
                  value: true,
                  message: "Can’t be empty",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid e-mail address",
                },
              })}
              error={errors.email?.message ?? undefined}
            />
          </div>

          <div>
            <label className="text-xs text-appGreyD" htmlFor="Password">
              Password
            </label>
            <AppTextField
              type="password"
              id="Password"
              placeholder="Enter your password"
              icon={<PiLockKeyFill />}
              {...register("password", {
                required: {
                  value: true,
                  message: "Can’t be empty",
                },
              })}
              error={errors.password?.message ?? undefined}
            />
          </div>

          <AppButton type="submit" disabled={validateDisabledButton()}>
            Login
          </AppButton>

          <div className="flex flex-col items-center md:flex-row md:justify-center">
            <a className="text-appGrey" href="#">
              Don’t have an account?
            </a>
            <a className="text-appPurple" href="#">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
