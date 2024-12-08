import { ArrayAvailableSocialMedia } from "@/types/app-social-media";
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
    id: z.string({ message: "Each profile link must have a unique ID" }),
  })
  .refine(
    (val) => {
      const regex = regexPatterns[val.platform];
      return regex.test(val.url);
    },
    {
      message: "URL incorrect for the selected platform",
      path: ["url"],
    },
  );

export const profileUpdateSchema = z
  .object({
    profile_email: profileEmailSchema,
    profile_name: profileNameSchema,
    profile_last_name: profileLastNameSchema,
    profile_links: z
      .array(profileLinkSchema, {
        message: "Profile links should be a valid list",
      })
      .nonempty({ message: "The list of user links cannot be empty" }),
    profile_file: profileFileSchema.optional(),
    profile_image: z
      .object({
        id: z.string({ message: "Image ID is required" }),
        url: z
          .string({ message: "Image URL is required" })
          .url({ message: "Invalid URL format" }),
      })
      .optional(),
  })
  .refine((data) => data.profile_file || data.profile_image, {
    message: "At least one of 'profile_file' or 'profile_image' is required",
    path: ["profile_file", "profile_image"],
  });

export type profileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;

export const profileUpdateWithoutLinksSchema = z
  .object({
    profile_email: profileEmailSchema,
    profile_name: profileNameSchema,
    profile_last_name: profileLastNameSchema,
    profile_file: profileFileSchema.optional(),
    profile_image: z
      .object({
        id: z.string({ message: "Image ID is required" }),
        url: z
          .string({ message: "Image URL is required" })
          .url({ message: "Invalid URL format" }),
      })
      .optional(),
  })
  .refine((data) => data.profile_file || data.profile_image, {
    message: "At least one of 'profile_file' or 'profile_image' is required",
    path: ["profile_file", "profile_image"],
  });

export type profileUpdateWithoutLinksSchemaType = z.infer<
  typeof profileUpdateWithoutLinksSchema
>;
