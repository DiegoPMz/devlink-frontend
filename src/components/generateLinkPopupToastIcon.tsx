import { PublishDetailAttributes } from "@/utilities/PublishDetailsMap";

const generateLinkPopupToastIcon = (details?: PublishDetailAttributes) => {
  if (!details) return <div>📎</div>;

  return <div style={{ color: details.color }}>{details.icon}</div>;
};

export default generateLinkPopupToastIcon;
