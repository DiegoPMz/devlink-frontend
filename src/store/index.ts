import { create } from "zustand";

interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginUser {
  email: string;
  password: string;
}

// interface UserAppProfile {
//   profileEmail: string;
//   name: string;
//   lastName: string;
//   image: string;
//   links: null;
// }

interface useStoreAppState {
  register: RegisterUser;
  login: LoginUser;
  registerUserMethod: (registerData: RegisterUser) => void;
}

export const useStoreApp = create<useStoreAppState>((set) => ({
  login: {
    email: "",
    password: "",
  },

  register: {
    email: "",
    password: "",
    confirmPassword: "",
  },

  registerUserMethod: async ({
    email,
    password,
    confirmPassword,
  }: RegisterUser) =>
    set((state) => {
      const validateData = email && password && confirmPassword;
      if (!validateData) console.log("❌❌❌");

      return { ...state };
    }),
}));
