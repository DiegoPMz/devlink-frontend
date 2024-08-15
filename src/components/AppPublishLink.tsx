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

import { FaArrowRight } from "react-icons/fa6";

import { AvailableSocialMedia } from "@/types/social-media";
import { twclass } from "@/utilities/twclass";

interface AppPublishLinkProps {
  size?: "sm";
  socialMedia: AvailableSocialMedia;
  link: string;
}

interface PublishDetailAttributes {
  displayName: string;
  color: string;
  icon: React.ReactNode;
}

const publishDetailsMap: Record<AvailableSocialMedia, PublishDetailAttributes> =
  {
    codepen: {
      color: "#FCD900",
      displayName: "Codepen",
      icon: <LiaCodepen className="h-[20px] w-[20px]" />,
    },
    codewars: {
      color: "#8A1A50",
      displayName: "Codewars",
      icon: <SiCodewars className="h-[20px] w-[20px]" />,
    },
    devto: {
      color: "#333333",
      displayName: "Dev.to",
      icon: <BiLogoDevTo className="h-[20px] w-[20px]" />,
    },
    facebook: {
      color: "#2442AC",
      displayName: "Facebook",
      icon: <FaFacebook className="h-[20px] w-[20px]" />,
    },
    freecodecamp: {
      color: "#302267",
      displayName: "FreeCodeCamp",
      icon: <FaFreeCodeCamp className="h-[20px] w-[20px]" />,
    },
    frontendmentor: {
      color: "#FFFFFF",
      displayName: "Frontend Mentor",
      icon: <SiFrontendmentor className="h-[20px] w-[20px]" />,
    },
    github: {
      color: "#1A1A1A",
      displayName: "GitHub",
      icon: <TbBrandGithubFilled className="h-[20px] w-[20px]" />,
    },
    gitlab: {
      color: "#EB4925",
      displayName: "GitLab",
      icon: <FaGitlab className="h-[20px] w-[20px]" />,
    },
    hashnode: {
      color: "#0330D1",
      displayName: "Hashnode",
      icon: <FaHashnode className="h-[20px] w-[20px]" />,
    },
    linkedin: {
      color: "#2D68FF",
      displayName: "LinkedIn",
      icon: <ImLinkedin className="h-[20px] w-[20px]" />,
    },
    stackoverflow: {
      color: "#EC7100",
      displayName: "Stack Overflow",
      icon: <FaStackOverflow className="h-[20px] w-[20px]" />,
    },
    twitch: {
      color: "#bf94ff",
      displayName: "Twitch",
      icon: <FaTwitch className="h-[20px] w-[20px]" />,
    },
    twitter: {
      color: "#43B7E9",
      displayName: "Twitter",
      icon: <FaSquareXTwitter className="h-[20px] w-[20px]" />,
    },
    youtube: {
      color: "#EE3939",
      displayName: "YouTube",
      icon: <FaYoutube className="h-[20px] w-[20px]" />,
    },
  };

export const AppPublishLink = ({
  link,
  socialMedia,
  size,
}: AppPublishLinkProps) => {
  const publish = publishDetailsMap[socialMedia];
  if (!publish) throw new Error("Invalid parameter social media");

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={twclass(
          "flex h-[56px] min-w-[237px] items-center justify-between rounded-lg p-[16px] text-white",
          size && "h-[44px]",
          publish.displayName === "Frontend Mentor" &&
            "text-appGreyD ring-1 ring-appBorder",
        )}
        style={{ backgroundColor: publish.color }}
      >
        <div className="flex items-center gap-[8px]">
          {publish.icon}
          {publish.displayName}
        </div>

        <FaArrowRight />
      </a>
    </>
  );
};
