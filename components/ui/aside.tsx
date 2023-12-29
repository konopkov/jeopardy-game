import styles from "./aside.module.css";

export type AsideProps = {
  children?: React.ReactNode;
};

export const Aside = (props: AsideProps) => {
  return <aside className={styles.aside}>{props.children ?? ""}</aside>;
};
