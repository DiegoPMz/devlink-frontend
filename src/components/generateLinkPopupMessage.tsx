const generateLinkPopupMessage = (text: string, position: number) => {
  return (
    <div className="flex gap-[4px]">
      <span className="font-semibold">{text}</span>
      <span>updated to position {position + 1}</span>
    </div>
  );
};

export default generateLinkPopupMessage;
