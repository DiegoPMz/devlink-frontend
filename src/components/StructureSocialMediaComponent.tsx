interface DefaultStructureProps {
  children: React.ReactNode;
}

export const StructureSocialMediaComponent = ({
  children,
}: DefaultStructureProps) => {
  return <div className="flex items-center gap-[12px]">{children}</div>;
};
