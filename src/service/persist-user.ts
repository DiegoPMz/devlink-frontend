import { UserSliceProfile } from "@/store/userSlice";
import { getData } from "@/utilities/localStorage-utils";

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
  const EMPTY_STATE: Omit<UserSliceProfile, "profile_file"> = {
    id: null,
    credentials: null,
    profile_email: "",
    profile_name: "",
    profile_last_name: "",
    profile_image: { id: null, url: null },
    profile_links: [],
    profile_template: null,
  };
  const getState = getUserDetails();

  if (!getState) return EMPTY_STATE;
  return getState.state;
};
