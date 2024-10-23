import { AppInputPicture } from "@/components/ui/AppInputPicture";
import { AppTextField } from "@/components/ui/AppTextField";
import { AppMainLayout } from "@/layouts/AppMainLayout";
import { useStoreApp } from "@/store";

export const ProfilePage = () => {
  const {
    profile_name,
    profile_last_name,
    profile_email,
    profile_image,
    onChangeDetails,
  } = useStoreApp((state) => state.user);

  return (
    <AppMainLayout>
      <div className="flex flex-col gap-[40px]">
        {/* Container introduction "Profile Details" */}
        <div>
          <h2 className="text-2xl font-bold text-appGreyD">Profile Details</h2>
          <p className="text-appGrey">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-[24px]">
          {/* Container Profile picture */}
          <div className="flex flex-col gap-[16px] rounded-lg bg-appGreyL p-[1.25rem] md:flex-row md:items-center md:justify-between">
            <span className="text-appGrey md:min-w-fit">Profile picture</span>
            <div className="flex flex-col gap-[24px] md:w-[60%] md:flex-row md:items-center">
              <AppInputPicture
                onchange={(value) =>
                  onChangeDetails("profile_file", value as File)
                }
                currentFile={profile_image.url ?? undefined}
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
                  value={profile_name}
                  onChange={(e) =>
                    onChangeDetails("profile_name", e.target.value)
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
                  value={profile_last_name}
                  onChange={(e) =>
                    onChangeDetails("profile_last_name", e.target.value)
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
                  value={profile_email}
                  onChange={(e) =>
                    onChangeDetails("profile_email", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppMainLayout>
  );
};
