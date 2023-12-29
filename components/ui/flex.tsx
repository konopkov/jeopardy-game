export type FlexProps = {
  children?: React.ReactNode;
};

export const FlexColumn = (props: FlexProps) => {
  return <div className="flex flex-col gap-2">{props.children ?? ""}</div>;
};

export const FlexRow = (props: FlexProps) => {
  return <div className="flex flex-row gap-2">{props.children ?? ""}</div>;
};
