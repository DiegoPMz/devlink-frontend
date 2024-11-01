import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authSlice, AuthSliceType } from "./AuthSlice";
import { errorSlice, ErrorSliceType } from "./errorSlice";
import { userSlice, UserSliceType } from "./userSlice";

type UnionSliceTypes = UserSliceType & AuthSliceType & ErrorSliceType;

export const useStoreApp = create<UnionSliceTypes>()(
  devtools((...args) => ({
    ...authSlice(...args),
    ...userSlice(...args),
    ...errorSlice(...args),
  })),
);
