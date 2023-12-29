export type FlexProps = {
  children?: React.ReactNode;
};

export const FlexColumn = (props: FlexProps) => {
  return <div className="flex flex-col">{props.children ?? ""}</div>;
};

export const FlexRow = (props: FlexProps) => {
  return <div className="flex flex-row">{props.children ?? ""}</div>;
};
