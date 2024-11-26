import { twclass } from "@/utilities/twclass";
import { useRef, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

const FILE_TYPES = ["image/jpeg", "image/png"];
const FILE_SIZE = 1048576;

interface AppInputPictureProps {
  onChange?: (currentFile: File | null) => void;
  addImage?: string | undefined;
}

interface FileErrorType {
  isError: boolean;
  message: null | string;
}
const FILE_ERROR = {
  isError: false,
  message: null,
};

export const AppInputPicture = ({
  onChange,
  addImage,
}: AppInputPictureProps) => {
  const [currentImage, setCurrentImage] = useState(addImage ?? "");
  const [fileError, setFileError] = useState<FileErrorType>(FILE_ERROR);
  const inputFile = useRef<HTMLInputElement>(null);

  const fileValidations = (file: File) => {
    if (!FILE_TYPES.find((type) => type === file.type)) {
      setFileError({
        isError: true,
        message: "File type not allowed",
      });
      return true;
    }

    if (file.size > FILE_SIZE) {
      setFileError({
        isError: true,
        message: "File is too large",
      });
      return true;
    }

    setFileError(FILE_ERROR);
    return false;
  };

  const triggerFileEvent = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;

    const fileAdded = e.currentTarget.files[0];
    const isValidationError = fileValidations(fileAdded);
    if (isValidationError) {
      setCurrentImage("");
      onChange && onChange(null);
      return;
    }

    const imageUrl = URL.createObjectURL(fileAdded);
    setCurrentImage(imageUrl);
    onChange && onChange(fileAdded);
  };

  return (
    <div
      className={twclass(
        "relative z-[60] flex aspect-square w-[193px] min-w-[193px] cursor-grab overflow-hidden rounded-lg bg-accent-secondary-color before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-lg before:bg-black before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear",
        currentImage &&
          "hover:before:contents-[''] before:pointer-events-auto hover:before:opacity-60",
        fileError.isError && "ring-1 ring-error-primary-color",
      )}
      onClick={triggerFileEvent}
    >
      <div className="pointer-events-none absolute flex h-full w-full flex-col items-center justify-center">
        <AiOutlinePicture
          className={twclass(
            "h-[40px] w-[40px] text-accent-primary-color",
            currentImage && "text-accent-p-contrast-color",
            fileError.isError && "text-error-primary-color",
          )}
        />
        <span
          className={twclass(
            "font-bold text-accent-primary-color",
            currentImage && "text-accent-p-contrast-color",
            fileError.isError && "text-error-primary-color",
          )}
        >
          {!currentImage ? "+ Upload Image" : "Change Image"}
        </span>
      </div>

      <img
        className={twclass("w-full object-cover object-center")}
        src={currentImage}
      />

      {fileError.isError && (
        <span className="absolute bottom-0 w-full text-center text-sm text-error-primary-color">
          {fileError.message}
        </span>
      )}

      <input ref={inputFile} type="file" hidden onChange={handleChange} />
    </div>
  );
};
