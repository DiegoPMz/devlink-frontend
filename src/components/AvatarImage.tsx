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
          "aspect-square w-[96px] rounded-full bg-appBorder",
          size === "lg" && "w-[108px]",
          animation ?? "",
        )}
      />
    );
  }

  return (
    <div
      className={twclass(
        "aspect-square w-[96px] rounded-full bg-appPurple p-[4px]",
        size === "lg" && "w-[108px]",
      )}
    >
      <img
        className="aspect-square w-full rounded-full object-cover"
        src={imageUrl ?? URL.createObjectURL(imageFile as File)}
      />
    </div>
  );
};
