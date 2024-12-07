interface LinkPopupMessages {
  bold?: string;
  message: string;
}

const generateLinkPopupMessage = (text: LinkPopupMessages) => {
  return (
    <div className="flex gap-[4px]">
      {text.bold && (
        <span className="min-w-fit font-semibold">{text.bold}</span>
      )}
      <span className="min-w-fit"> {text.message}</span>
    </div>
  );
};

export default generateLinkPopupMessage;
