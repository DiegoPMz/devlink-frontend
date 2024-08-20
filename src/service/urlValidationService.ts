import { AvailableSocialMedia } from "@/types/social-media";
import { ArrayAvailableSocialMedia } from "../types/social-media";
import { regexPatterns } from "../utilities/regex-social-media";

interface ErrorResponse {
  status: boolean;
  message: string;
}

type ValidationMethodType = () => ErrorResponse;
type ValidationTypes = Record<AvailableSocialMedia, ValidationMethodType>;

export const urlValidationService = (
  socialMedia: AvailableSocialMedia | "",
  value: string,
): ErrorResponse => {
  const defaultNotErrorObject = {
    status: false,
    message: "",
  };

  const defaultErrorNotValidValue = {
    status: true,
    message: "Please check the URL",
  };

  if (!socialMedia || !ArrayAvailableSocialMedia.includes(socialMedia))
    return defaultNotErrorObject;

  if (!value)
    return {
      status: true,
      message: "Can’t be empty",
    };

  const validationDictionary: ValidationTypes = {
    codepen: () => {
      if (!regexPatterns.codepen.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },

    codewars: () => {
      if (!regexPatterns.codewars.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    devto: () => {
      if (!regexPatterns.devto.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    facebook: () => {
      if (!regexPatterns.facebook.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    freecodecamp: () => {
      if (!regexPatterns.freecodecamp.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    frontendmentor: () => {
      if (!regexPatterns.frontendmentor.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    github: () => {
      if (!regexPatterns.github.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    gitlab: () => {
      if (!regexPatterns.gitlab.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    hashnode: () => {
      if (!regexPatterns.hashnode.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    linkedin: () => {
      if (!regexPatterns.linkedin.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    stackoverflow: () => {
      if (!regexPatterns.stackoverflow.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    twitch: () => {
      if (!regexPatterns.twitch.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    twitter: () => {
      if (!regexPatterns.twitter.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
    youtube: () => {
      if (!regexPatterns.youtube.test(value)) {
        return defaultErrorNotValidValue;
      }

      return defaultNotErrorObject;
    },
  };

  const errorResponse = validationDictionary[socialMedia]();
  return errorResponse;
};
