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
          animation ?? "",
        )}
      />
    );
  }

  return (
    <div className="aspect-square w-[96px] rounded-full bg-appPurple p-[4px]">
      <img
        className="aspect-square w-full rounded-full object-cover"
        src={imageUrl ?? URL.createObjectURL(imageFile as File)}
      />
    </div>
  );
};
