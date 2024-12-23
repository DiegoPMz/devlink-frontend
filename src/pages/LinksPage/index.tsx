import { DraggableList } from "@/components/DraggableList";
import { AppButton } from "@/components/ui/AppButton";
import { AppMainLayout } from "@/layouts/AppMainLayout";
import { useStoreApp } from "@/store";
import { EmptyLinkContent } from "./components/EmptyLinkContent";
import { SocialLinkItem } from "./components/SocialLinkItem";

const LinksPage = () => {
  const {
    profile_links,
    onChangeLink,
    generateLink,
    removeLink,
    setProfileLinks,
    handleLinkSortedToast,
  } = useStoreApp((state) => state.user);

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

        {profile_links.length > 0 && (
          <DraggableList
            draggableItems={profile_links}
            onItemsUpdate={(stateSorted) => setProfileLinks(stateSorted)}
            getReorderedItemId={(itemId) => handleLinkSortedToast(itemId)}
          >
            <ul className="flex flex-col gap-[24px]">
              {profile_links.map((item, index) => (
                <DraggableList.SortableItem key={item.id} id={item.id}>
                  <li>
                    <SocialLinkItem
                      link={item}
                      position={index}
                      onChangeLink={onChangeLink}
                      removeLink={removeLink}
                    />
                  </li>
                </DraggableList.SortableItem>
              ))}
            </ul>
          </DraggableList>
        )}
      </div>
    </AppMainLayout>
  );
};

export default LinksPage;
