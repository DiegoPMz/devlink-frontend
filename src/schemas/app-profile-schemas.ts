import { ArrayAvailableSocialMedia } from "@/types/social-media";
import { regexPatterns } from "@/utilities/regex-social-media";
import z from "zod";

export const profileNameSchema = z
  .string({ message: "Please enter your name" })
  .min(1, { message: "Name cannot be empty" });

export const profileLastNameSchema = z
  .string({ message: "Please enter your last name" })
  .min(1, { message: "Last name cannot be empty" });

export const profileEmailSchema = z
  .string({ message: "Please enter your email" })
  .email({ message: "Please enter a valid email address" });

export const profileFileSchema = z.instanceof(File, {
  message: "Please upload a valid file",
});

export const profileLinkSchema = z
  .object({
    platform: z.enum(ArrayAvailableSocialMedia, {
      message: "Please select a valid platform",
    }),
    url: z
      .string({ message: "Please enter a URL" })
      .min(1, { message: "URL cannot be empty" }),
  })
  .refine(
    (val) => {
      const regex = regexPatterns[val.platform];
      return regex.test(val.url);
    },
    {
      message: "The URL format is incorrect for the selected platform",
      path: ["url"],
    },
  );
