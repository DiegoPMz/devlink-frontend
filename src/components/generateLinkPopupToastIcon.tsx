import { PublishDetailAttributes } from "@/utilities/PublishDetailsMap";
import { TbUnlink } from "react-icons/tb";

const generateLinkPopupToastIcon = (details?: PublishDetailAttributes) => {
  if (!details) return <TbUnlink className="text-accent-primary-color" />;

  return <div style={{ color: details.color }}>{details.icon}</div>;
};

export default generateLinkPopupToastIcon;
