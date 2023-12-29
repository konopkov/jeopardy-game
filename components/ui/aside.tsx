export type AsideProps = {
  children?: React.ReactNode;
};

export const Aside = (props: AsideProps) => {
  return <aside style={{ gridArea: "aside" }}>{props.children ?? ""}</aside>;
};
