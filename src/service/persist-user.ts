import { UserSliceProfile, UserSliceType } from "@/store/userSlice";
import { getData } from "@/utilities/localStorage-utils";

export type PersistUserType = Omit<UserSliceProfile, "profile_file">;

interface PersistZustandType {
  state: Omit<UserSliceProfile, "profile_file">;
  version: number;
}

export const USER_DETAILS_KEY = "uDetails";

export const getUserDetails = () => {
  const user: PersistZustandType | null = getData(USER_DETAILS_KEY);
  return user;
};

export const getPersistedState = () => {
  const EMPTY_STATE: PersistUserType = {
    id: null,
    credentials: null,
    profile_email: "",
    profile_name: "",
    profile_last_name: "",
    profile_image: { id: null, url: null },
    profile_links: [],
    profile_template: null,
    theme: "default-theme",
    template_bg: "template-custom-bg-one",
  };

  const getState = getUserDetails();

  if (!getState) return EMPTY_STATE;
  return getState.state;
};

export const toPersistableUser = ({
  user,
}: UserSliceType): PersistUserType => ({
  credentials: user.credentials,
  id: user.id,
  profile_email: user.profile_email,
  profile_name: user.profile_name,
  profile_last_name: user.profile_last_name,
  profile_image: user.profile_image,
  profile_links: user.profile_links,
  profile_template: user.profile_template,
  theme: user.theme,
  template_bg: user.template_bg,
});
