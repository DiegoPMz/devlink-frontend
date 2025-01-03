import { twclass } from "@/utilities/twclass";

interface AvatarImageProps {
  imageUrl?: string;
  imageFile?: File;
  size?: "sm" | "lg";
  animation?: string;
}

export const AvatarImage = ({
  imageUrl,
  imageFile,
  size = "sm",
  animation,
}: AvatarImageProps) => {
  if (!imageUrl && !imageFile) {
    return (
      <span
        className={twclass(
          "aspect-square w-[96px] rounded-full bg-ui-border-color",
          size === "lg" && "w-[108px]",
          animation ?? "",
        )}
      />
    );
  }

  const displayedImage = () => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return imageUrl;
  };

  return (
    <div
      className={twclass(
        "aspect-square w-[96px] rounded-full bg-accent-primary-color p-[4px]",
        size === "lg" && "w-[108px]",
      )}
    >
      <img
        className="aspect-square w-full rounded-full object-cover"
        src={displayedImage()}
      />
    </div>
  );
};
