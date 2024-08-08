import { IllustrationEmpty } from "@/assets/IllustrationEmpty";

export const EmptyLinkContent = () => {
  return (
    <div className="flex flex-col rounded-xl bg-red-400 px-[20px] py-[40px] md:gap-[40px] md:py-[100px]">
      <div>
        <div className="flex justify-center md:hidden">
          <IllustrationEmpty mobile={true} />
        </div>
        <div className="hidden md:flex md:justify-center">
          <IllustrationEmpty />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:items-center">
        <h2 className="text-2xl font-bold text-appGreyD md:text-center md:text-[32px]">
          Let’s get you started
        </h2>
        <p className="w-fit bg-green-200 text-appGrey md:w-[488px] md:text-center">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
};
