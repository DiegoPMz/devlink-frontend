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

import { AvailableSocialMedia } from "@/types/social-media";

interface PublishDetailAttributes {
  displayName: string;
  color: string;
  icon: React.ReactNode;
  value: string;
}

const PublishDetailsMap: Record<AvailableSocialMedia, PublishDetailAttributes> =
  {
    codepen: {
      color: "#FCD900",
      displayName: "Codepen",
      icon: <LiaCodepen className="h-[20px] w-[20px]" />,
      value: "codepen",
    },
    codewars: {
      color: "#8A1A50",
      displayName: "Codewars",
      icon: <SiCodewars className="h-[20px] w-[20px]" />,
      value: "codewars",
    },
    devto: {
      color: "#333333",
      displayName: "Dev.to",
      icon: <BiLogoDevTo className="h-[20px] w-[20px]" />,
      value: "devto",
    },
    facebook: {
      color: "#2442AC",
      displayName: "Facebook",
      icon: <FaFacebook className="h-[20px] w-[20px]" />,
      value: "facebook",
    },
    freecodecamp: {
      color: "#302267",
      displayName: "FreeCodeCamp",
      icon: <FaFreeCodeCamp className="h-[20px] w-[20px]" />,
      value: "freecodecamp",
    },
    frontendmentor: {
      color: "#FFFFFF",
      displayName: "Frontend Mentor",
      icon: <SiFrontendmentor className="h-[20px] w-[20px]" />,
      value: "frontendmentor",
    },
    github: {
      color: "#1A1A1A",
      displayName: "GitHub",
      icon: <TbBrandGithubFilled className="h-[20px] w-[20px]" />,
      value: "github",
    },
    gitlab: {
      color: "#EB4925",
      displayName: "GitLab",
      icon: <FaGitlab className="h-[20px] w-[20px]" />,
      value: "gitlab",
    },
    hashnode: {
      color: "#0330D1",
      displayName: "Hashnode",
      icon: <FaHashnode className="h-[20px] w-[20px]" />,
      value: "hashnode",
    },
    linkedin: {
      color: "#2D68FF",
      displayName: "LinkedIn",
      icon: <ImLinkedin className="h-[20px] w-[20px]" />,
      value: "linkedin",
    },
    stackoverflow: {
      color: "#EC7100",
      displayName: "Stack Overflow",
      icon: <FaStackOverflow className="h-[20px] w-[20px]" />,
      value: "stackoverflow",
    },
    twitch: {
      color: "#bf94ff",
      displayName: "Twitch",
      icon: <FaTwitch className="h-[20px] w-[20px]" />,
      value: "twitch",
    },
    twitter: {
      color: "#43B7E9",
      displayName: "Twitter",
      icon: <FaSquareXTwitter className="h-[20px] w-[20px]" />,
      value: "twitter",
    },
    youtube: {
      color: "#EE3939",
      displayName: "YouTube",
      icon: <FaYoutube className="h-[20px] w-[20px]" />,
      value: "youtube",
    },
  };

export default PublishDetailsMap;