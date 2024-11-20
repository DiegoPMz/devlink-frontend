import { AppButton } from "@/components/ui/AppButton";
import { AppMainLayout } from "@/layouts/AppMainLayout";
import { useStoreApp } from "@/store";
import { EmptyLinkContent } from "./components/EmptyLinkContent";
import { SocialLinkItem } from "./components/SocialLinkItem";

export const LinksPage = () => {
  const { profile_links, onChangeLink, generateLink, removeLink } = useStoreApp(
    (state) => state.user,
  );

  return (
    <AppMainLayout>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col rounded-md bg-bg-color-primary">
          <h1 className="text-[24px] font-bold text-txt-color-secondary">
            Customize your links
          </h1>
          <p className="pb-[30px] text-txt-color-primary">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>

          <AppButton type="button" variant="secondary" onClick={generateLink}>
            + Add new link
          </AppButton>
        </div>

        {/* Content empty links */}
        {profile_links.length === 0 && <EmptyLinkContent />}

        {profile_links.length >= 1 && (
          <form className="flex flex-col gap-[24px]">
            {profile_links.map((link, index) => (
              <SocialLinkItem
                key={link.id}
                link={link}
                position={index}
                onChangeLink={onChangeLink}
                removeLink={removeLink}
              />
            ))}
          </form>
        )}
      </div>
    </AppMainLayout>
  );
};
