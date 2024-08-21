import { AppBar } from "@/components/AppBar";
import { PreviewLinks } from "@/components/PreviewLinks";
import { AppButton } from "@/components/ui/AppButton";
import { AppInputPicture } from "@/components/ui/AppInputPicture";
import { AppTextField } from "@/components/ui/AppTextField";
import { useStoreApp } from "@/store";

export const ProfilePage = () => {
  const onChangeState = useStoreApp((state) => state.onChangeBasicDetails);
  const appState = useStoreApp((state) => state.userProfile);
  const isSubmissionAllowed = useStoreApp((state) => state.isSubmissionAllowed);

  console.log(appState);
  console.log(isSubmissionAllowed());

  return (
    <div className="bg-appGreyL md:flex md:h-[100dvh] md:flex-col lg:p-[24px]">
      <div className="sticky top-0 z-50 h-fit">
        <AppBar />
      </div>

      <div className="flex h-full flex-col p-[16px] lg:p-0 lg:pt-[24px] xl:flex-row xl:gap-[24px]">
        <section className="hidden rounded-lg bg-white xl:flex xl:w-[50%] xl:max-w-[560px] xl:items-center xl:justify-center">
          <PreviewLinks />
        </section>

        <section className="flex flex-col rounded-lg bg-white md:h-full xl:w-[100%]">
          <div className="rounded-lg p-[24px] md:p-[40px]">
            {/* Container introduction "Profile Details" */}
            <div className="pb-[40px]">
              <h2 className="text-2xl font-bold text-appGreyD">
                Profile Details
              </h2>
              <p className="text-appGrey">
                Add your details to create a personal touch to your profile.
              </p>
            </div>
            <div className="flex flex-col gap-[24px]">
              {/* Container Profile picture */}
              <div className="flex flex-col gap-[16px] rounded-lg bg-appGreyL p-[1.25rem] md:flex-row md:items-center md:justify-between">
                <span className="text-appGrey md:min-w-fit">
                  Profile picture
                </span>
                <div className="flex flex-col gap-[24px] md:w-[60%] md:flex-row md:items-center">
                  <AppInputPicture
                    currentFile={appState.profile_image}
                    onchange={(value) =>
                      onChangeState("profile_image", value as string)
                    }
                  />
                  <span className="text-xs text-appGrey">
                    Image must be below 1024x1024px. Use PNG or JPG format.
                  </span>
                </div>
              </div>
              {/*Container User inputs  */}
              <div className="flex flex-col gap-[12px] rounded-lg bg-appGreyL p-[1.25rem]">
                <div className="md:flex md:items-center md:justify-between">
                  <label
                    className="text-xs text-appGrey md:text-base"
                    htmlFor="firstName"
                  >
                    First name*
                  </label>
                  <div className="w-full md:w-[60%]">
                    <AppTextField
                      id="firstName"
                      name="profile_name"
                      value={appState.profile_name}
                      onChange={(e) =>
                        onChangeState(
                          e.target.name as "profile_name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center md:justify-between">
                  <label
                    className="text-xs text-appGrey md:text-base"
                    htmlFor="lastName"
                  >
                    Last name*
                  </label>
                  <div className="w-full md:w-[60%]">
                    <AppTextField
                      id="lastName"
                      name="profile_last_name"
                      value={appState.profile_last_name}
                      onChange={(e) =>
                        onChangeState(
                          e.target.name as "profile_last_name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center md:justify-between">
                  <label
                    className="text-xs text-appGrey md:text-base"
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <div className="w-full md:w-[60%]">
                    <AppTextField
                      id="email"
                      name="Profile_email"
                      value={appState.Profile_email}
                      onChange={(e) =>
                        onChangeState(
                          e.target.name as "Profile_email",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Container button Save */}
          <div className="md:flex md:h-full md:items-end">
            <div className="xl: bottom-0 left-0 w-full border-t-2 border-appBorder p-[16px] md:flex md:justify-end md:p-[24px] md:pr-[40px]">
              <div className="w-full md:w-[91px] xl:h-fit">
                <AppButton disabled={isSubmissionAllowed() === false}>
                  Save
                </AppButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
