import { UserSliceProfile } from "@/store/userSlice";
import { getData } from "@/utilities/localStorage-utils";

interface PersistZustandType {
  state: UserSliceProfile;
  version: number;
}

export const USER_DETAILS_KEY = "uDetails";

export const getUserDetails = () => {
  const user: PersistZustandType | null = getData(USER_DETAILS_KEY);
  return user;
};
