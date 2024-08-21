import { AppBar } from "@/components/AppBar";
import { PreviewLinks } from "@/components/PreviewLinks";
import { SocialMediaCollection } from "@/components/Social-media-collection";
import { AppButton } from "@/components/ui/AppButton";
import { AppDropDown } from "@/components/ui/AppDropDown";
import { AppTextField } from "@/components/ui/AppTextField";
import { useStoreApp } from "@/store";
import { AvailableSocialMedia } from "@/types/social-media";
import { HiBars2 } from "react-icons/hi2";
import { EmptyLinkContent } from "./components/EmptyLinkContent";

export const LinksPage = () => {
  const appUserLinks = useStoreApp((state) => state.userProfile.profile_links);
  const handlerGenerateNewLink = useStoreApp((state) => state.generateNewLink);
  const handlerChangeLinks = useStoreApp((state) => state.onChangeLinks);
  const handlerRemoveLink = useStoreApp((state) => state.removeLink);

  const isSubmissionAllowed = useStoreApp((state) => state.isSubmissionAllowed);

  return (
    <div className="relative bg-appGreyL px-[16px] md:p-[24px]">
      <div className="sticky top-0 z-50 pb-[16px] md:pb-[24px]">
        <AppBar />
      </div>

      <div className="relative h-full w-full lg:flex lg:justify-center lg:gap-[24px]">
        <section className="relative hidden min-h-full rounded-xl bg-white lg:flex lg:w-[50%] lg:justify-center lg:py-[40px] xl:py-[100px]">
          <div className="sticky top-[170px] h-fit">
            <PreviewLinks />
          </div>
        </section>
        <section className="relative flex w-full flex-col rounded-xl bg-white">
          <div className="h-full px-[24px] pb-[24px] md:px-[40px] md:pb-[40px]">
            {/* Introduction text "Customize your links" */}
            <div className="sticky top-[60px] z-40 flex flex-col rounded-md bg-white pb-[24px] pt-[24px] md:gap-[12px] md:pt-[40px]">
              <h1 className="text-2xl font-bold text-appGreyD md:text-[32px]">
                Customize your links
              </h1>
              <p className="pb-[30px] text-appGrey">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>

              <AppButton
                type="button"
                variant="secondary"
                // onClick={handlerNewLink}
                onClick={handlerGenerateNewLink}
              >
                + Add new link
              </AppButton>
            </div>

            {/* Content empty links */}
            {appUserLinks.length === 0 && <EmptyLinkContent />}

            {/* Generate inputs for register links */}
            {appUserLinks.length >= 1 && (
              <form
                className="flex flex-col gap-[24px] bg-white"
                id="linkPage-form-id"
              >
                {appUserLinks.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-[12px] rounded-lg bg-appGreyL p-[20px]"
                  >
                    <article className="flex justify-between text-appGrey">
                      <div className="flex items-center gap-[8px] font-bold">
                        <HiBars2 />
                        <span>Link #{index + 1} </span>
                      </div>
                      <button
                        type="button"
                        formNoValidate
                        className="transition-colors duration-200 ease-out hover:text-appRed"
                        onClick={() => handlerRemoveLink(field.id)}
                      >
                        Remove
                      </button>
                    </article>
                    {/*  */}
                    <article className="flex flex-col gap-[12px]">
                      <div>
                        <label className="text-xs text-appGreyD" htmlFor="">
                          Platform
                        </label>
                        <AppDropDown
                          options={SocialMediaCollection}
                          onChange={(e) =>
                            handlerChangeLinks(field.id, {
                              ...field,
                              social_media: e as AvailableSocialMedia | "",
                            })
                          }
                          selected={field.social_media}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-appGreyD" htmlFor="">
                          Link
                        </label>
                        <AppTextField
                          onChange={(e) =>
                            handlerChangeLinks(field.id, {
                              ...field,
                              url: e.target.value,
                            })
                          }
                          value={field.url}
                        />
                      </div>
                    </article>
                  </div>
                ))}
              </form>
            )}
          </div>

          {/* Bottom sticky button */}
          <div className="sticky bottom-0 w-full rounded-b-xl border-t-2 border-appBorder bg-white p-[16px] md:flex md:justify-end">
            <div className="md:hidden">
              <AppButton
                form="linkPage-form-id"
                type="submit"
                disabled={isSubmissionAllowed() === false}
              >
                Save
              </AppButton>
            </div>

            <div className="hidden w-[92px] md:block">
              <AppButton
                form="linkPage-form-id"
                type="submit"
                disabled={isSubmissionAllowed() === false}
              >
                Save
              </AppButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
