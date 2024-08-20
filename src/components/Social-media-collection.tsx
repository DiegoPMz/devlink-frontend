import { AvailableSocialMedia } from "@/types/social-media";
import { BiLogoDevTo } from "react-icons/bi";
import {
  FaFacebook,
  FaFreeCodeCamp,
  FaStackOverflow,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { FaGitlab, FaHashnode, FaSquareXTwitter } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { LiaCodepen } from "react-icons/lia";
import { SiCodewars, SiFrontendmentor } from "react-icons/si";
import { TbBrandGithubFilled } from "react-icons/tb";
import { StructureSocialMediaComponent } from "./StructureSocialMediaComponent";

interface OptionType {
  label: React.ReactNode;
  value: AvailableSocialMedia;
}

export const SocialMediaCollection: OptionType[] = [
  {
    label: (
      <StructureSocialMediaComponent>
        <SiCodewars />
        Codewars
      </StructureSocialMediaComponent>
    ),
    value: "codewars",
  },

  {
    label: (
      <StructureSocialMediaComponent>
        <LiaCodepen />
        Codepen
      </StructureSocialMediaComponent>
    ),
    value: "codepen",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <BiLogoDevTo />
        Dev.to
      </StructureSocialMediaComponent>
    ),
    value: "devto",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaFacebook />
        Facebook
      </StructureSocialMediaComponent>
    ),
    value: "facebook",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaFreeCodeCamp />
        FreeCodeCamp
      </StructureSocialMediaComponent>
    ),
    value: "freecodecamp",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <SiFrontendmentor />
        Frontend Mentor
      </StructureSocialMediaComponent>
    ),
    value: "frontendmentor",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaGitlab />
        GitLab
      </StructureSocialMediaComponent>
    ),
    value: "gitlab",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <TbBrandGithubFilled />
        GitHub
      </StructureSocialMediaComponent>
    ),
    value: "github",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaHashnode />
        Hashnode
      </StructureSocialMediaComponent>
    ),
    value: "hashnode",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <ImLinkedin />
        LinkedIn
      </StructureSocialMediaComponent>
    ),
    value: "linkedin",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaStackOverflow />
        Stack Overflow
      </StructureSocialMediaComponent>
    ),
    value: "stackoverflow",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaSquareXTwitter />
        Twitter
      </StructureSocialMediaComponent>
    ),
    value: "twitter",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaTwitch />
        Twitch
      </StructureSocialMediaComponent>
    ),
    value: "twitch",
  },
  {
    label: (
      <StructureSocialMediaComponent>
        <FaYoutube />
        YouTube
      </StructureSocialMediaComponent>
    ),
    value: "youtube",
  },
] as const;
