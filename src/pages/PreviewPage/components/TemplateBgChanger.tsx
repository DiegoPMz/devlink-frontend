import { TEMPLATE_BG_CLASSES, TemplateBgTypes } from "@/types/app-template-bg";
import { twclass } from "@/utilities/twclass";
import type * as CSS from "csstype";

interface Style extends CSS.Properties, CSS.PropertiesHyphen {
  "--s": string;
}

interface TemplateBgChangerProps {
  currentTemplateBg: TemplateBgTypes;
  onchangeTemplateBg: (templateBg: TemplateBgTypes) => void;
}

export const TemplateBgChanger: React.FC<TemplateBgChangerProps> = ({
  currentTemplateBg,
  onchangeTemplateBg,
}) => {
  const handleSelectTemplateBg = () => {
    const templateBgArraySize = TEMPLATE_BG_CLASSES.length;
    const currentIndexBg = TEMPLATE_BG_CLASSES.findIndex(
      (bg) => bg === currentTemplateBg,
    );

    if (currentIndexBg.toString() === "-1") return;

    const changePosition = currentIndexBg + 1;
    if (changePosition + 1 > templateBgArraySize) {
      onchangeTemplateBg?.(TEMPLATE_BG_CLASSES[0]);
      return;
    }

    onchangeTemplateBg?.(TEMPLATE_BG_CLASSES[changePosition]);
  };

  const style: Style = {
    "--s": currentTemplateBg === TEMPLATE_BG_CLASSES[0] ? "4px" : "12px",
  };

  return (
    <div
      style={style}
      className={twclass(
        currentTemplateBg,
        "motion-preset-fade-md h-full w-full rounded-lg ring-1 ring-ui-border-color motion-ease-spring-smooth",
      )}
    >
      <button
        type="button"
        className="absolute inset-0"
        onClick={handleSelectTemplateBg}
      />
    </div>
  );
};
