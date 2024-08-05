import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const twclass = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};
