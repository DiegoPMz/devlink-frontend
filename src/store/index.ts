import { USER_DETAILS_KEY } from "@/service/persist-user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authSlice, AuthSliceType } from "./AuthSlice";
import { errorSlice, ErrorSliceType } from "./errorSlice";
import { userSlice, UserSliceProfile, UserSliceType } from "./userSlice";

type UnionSliceTypes = UserSliceType & AuthSliceType & ErrorSliceType;

export const useStoreApp = create<UnionSliceTypes>()(
  devtools(
    persist(
      (...set) => ({
        ...authSlice(...set),
        ...userSlice(...set),
        ...errorSlice(...set),
      }),
      {
        name: USER_DETAILS_KEY,
        partialize: ({ user }): Omit<UserSliceProfile, "profile_file"> => ({
          credentials: user.credentials,
          id: user.id,
          profile_email: user.profile_email,
          profile_name: user.profile_name,
          profile_last_name: user.profile_last_name,
          profile_image: user.profile_image,
          profile_links: user.profile_links,
          profile_template: user.profile_template,
        }),

        skipHydration: true,
      },
    ),
  ),
);
