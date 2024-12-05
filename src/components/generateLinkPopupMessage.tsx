interface LinkPopupMessages {
  bold?: string;
  message: string;
}

const generateLinkPopupMessage = (text: LinkPopupMessages) => {
  return (
    <div className="flex gap-[4px]">
      {text.bold && <span className="font-semibold">{text.bold}</span>}
      <span> {text.message}</span>
    </div>
  );
};

export default generateLinkPopupMessage;
