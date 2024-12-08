import { AvailableSocialMedia } from "@/types/app-social-media";
import PublishDetailsMap from "@/utilities/PublishDetailsMap";
import { twclass } from "@/utilities/twclass";
import { FaArrowRight } from "react-icons/fa6";

interface AppPublishLinkProps {
  size?: "sm";
  socialMedia: AvailableSocialMedia;
  link?: string;
}

export const AppPublishLink = ({
  link,
  socialMedia,
  size,
}: AppPublishLinkProps) => {
  const publish = PublishDetailsMap[socialMedia];
  if (!publish) throw new Error("Invalid parameter social media");

  const Container = link ? "a" : "div";

  return (
    <Container
      href={link || undefined}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className={twclass(
        "flex h-[56px] min-w-[237px] items-center justify-between rounded-lg p-[16px] text-white",
        size && "h-[44px]",
        publish.displayName === "Frontend Mentor" &&
          "text-appGreyD ring-1 ring-appBorder",
        publish.value === "x" && "font-medium text-black",
      )}
      style={{ backgroundColor: publish.color }}
    >
      <div className="flex items-center gap-[8px]">
        {publish.icon}
        {publish.displayName}
      </div>
      <FaArrowRight />
    </Container>
  );
};
