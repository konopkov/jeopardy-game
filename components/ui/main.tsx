import styles from "./main.module.css";

export type MainProps = {
  children?: React.ReactNode;
};

export const Main = (props: MainProps) => {
  return <main className={styles.main}>{props.children ?? ""}</main>;
};
