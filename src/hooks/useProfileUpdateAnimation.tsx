import { useStoreApp } from "@/store";
import { useEffect, useState } from "react";

const useProfileUpdateAnimation = () => {
  const [animation, setAnimation] = useState("");

  const {
    profile_name,
    profile_last_name,
    profile_email,
    profile_links,
    profile_image,
    profile_file,
  } = useStoreApp((state) => state.user);

  useEffect(() => {
    setAnimation("");

    const addAnimation = setTimeout(() => {
      setAnimation("animate-pulse");
    }, 50);

    return () => clearTimeout(addAnimation);
  }, [
    profile_name,
    profile_last_name,
    profile_email,
    profile_links,
    profile_image,
    profile_file,
  ]);

  return animation;
};

export default useProfileUpdateAnimation;
