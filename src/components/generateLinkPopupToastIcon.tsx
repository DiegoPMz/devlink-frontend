import { PublishDetailAttributes } from "@/utilities/PublishDetailsMap";
import { TbUnlink } from "react-icons/tb";

const generateLinkPopupToastIcon = (details?: PublishDetailAttributes) => {
  if (!details) return <TbUnlink className="text-accent-primary-color" />;

  return (
    <div style={{ color: details.color }}>
      {details.value !== "github" ? (
        details.icon
      ) : (
        <div className="h-fit w-fit rounded-full bg-white p-[1px]">
          {details.icon}
        </div>
      )}
    </div>
  );
};

export default generateLinkPopupToastIcon;
