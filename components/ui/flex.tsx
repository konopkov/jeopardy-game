export type FlexProps = {
  children?: React.ReactNode;
  className?: string;
};

export const FlexColumn = (props: FlexProps) => {
  return (
    <div
      className={`flex flex-col gap-2 content-stretch items-stretch ${
        props.className ?? ""
      }`}
    >
      {props.children ?? ""}
    </div>
  );
};

export const FlexRow = (props: FlexProps) => {
  return (
    <div
      className={`flex flex-row gap-2 content-stretch items-center ${
        props.className ?? ""
      }`}
    >
      {props.children ?? ""}
    </div>
  );
};
