import { AvailableSocialMedia } from "@/types/social-media";

export const regexPatterns: Record<AvailableSocialMedia, RegExp> = {
  codewars: /^https:\/\/www\.codewars\.com\/users\/[a-zA-Z0-9_-]+$/,
  codepen: /^https:\/\/codepen\.io\/[a-zA-Z0-9_-]+$/,
  devto: /^https:\/\/dev\.to\/[a-zA-Z0-9_-]+$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}\/?$/,
  freecodecamp: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+$/,
  frontendmentor:
    /^https:\/\/www\.frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+$/,
  gitlab: /^https:\/\/gitlab\.com\/[a-zA-Z0-9_-]+$/,
  github: /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/,
  hashnode: /^https:\/\/[a-zA-Z0-9_-]+\.hashnode\.dev$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
  stackoverflow:
    /^https:\/\/stackoverflow\.com\/users\/[0-9]+\/[a-zA-Z0-9_-]+$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]{4,25}$/,
  youtube: /^https:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9_-]+$/,
};
