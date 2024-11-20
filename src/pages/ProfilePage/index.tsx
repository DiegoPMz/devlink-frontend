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
    profile_file,
  } = useStoreApp((state) => state.user);

  const error = useStoreApp((state) => state.appErrors);

  const currentImage = () => {
    if (profile_image.url) return profile_image.url;
    if (profile_file) return URL.createObjectURL(profile_file);
    return undefined;
  };

  return (
    <AppMainLayout>
      <div className="flex flex-col gap-[40px]">
        {/* Container introduction "Profile Details" */}
        <div>
          <h2 className="text-2xl font-bold text-txt-color-secondary">
            Profile Details
          </h2>
          <p className="text-txt-color-primary">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-[24px]">
          {/* Container Profile picture */}
          <div className="flex flex-col gap-[16px] rounded-lg bg-bg-color-secondary p-[1.25rem] md:flex-row md:items-center md:justify-between">
            <span className="text-txt-color-primary md:min-w-fit">
              Profile picture
            </span>
            <div className="flex flex-col gap-[24px] md:w-[60%] md:flex-row md:items-center">
              <AppInputPicture
                onChange={(inputValue) =>
                  onChangeDetails("profile_file", inputValue)
                }
                addImage={currentImage()}
              />
              <span className="text-xs text-txt-color-primary">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </span>
            </div>
          </div>
          {/*Container User inputs  */}
          <div className="flex flex-col gap-[12px] rounded-lg bg-bg-color-secondary p-[1.25rem]">
            <div className="md:flex md:items-center md:justify-between">
              <label
                className="text-xs text-txt-color-primary md:text-base"
                htmlFor="firstName"
              >
                First name*
              </label>
              <div className="w-full md:w-[60%]">
                <AppTextField
                  value={profile_name}
                  onChange={(e) =>
                    onChangeDetails("profile_name", e.target.value)
                  }
                  error={error.profile_name.message ?? undefined}
                />
              </div>
            </div>
            <div className="md:flex md:items-center md:justify-between">
              <label
                className="text-xs text-txt-color-primary md:text-base"
                htmlFor="lastName"
              >
                Last name*
              </label>
              <div className="w-full md:w-[60%]">
                <AppTextField
                  value={profile_last_name}
                  onChange={(e) =>
                    onChangeDetails("profile_last_name", e.target.value)
                  }
                  error={error.profile_last_name.message ?? undefined}
                />
              </div>
            </div>
            <div className="md:flex md:items-center md:justify-between">
              <label
                className="text-xs text-txt-color-primary md:text-base"
                htmlFor="email"
              >
                Email*
              </label>
              <div className="w-full md:w-[60%]">
                <AppTextField
                  value={profile_email}
                  onChange={(e) =>
                    onChangeDetails("profile_email", e.target.value)
                  }
                  error={error.profile_email.message ?? undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppMainLayout>
  );
};
