import {
  PersistUserType,
  toPersistableUser,
  USER_DETAILS_KEY,
} from "@/service/persist-user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authSlice, AuthSliceType } from "./AuthSlice";
import { errorSlice, ErrorSliceType } from "./errorSlice";
import { userSlice, UserSliceType } from "./userSlice";

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
        skipHydration: true,
        partialize: (userSlice): PersistUserType =>
          toPersistableUser(userSlice),
      },
    ),
  ),
);
