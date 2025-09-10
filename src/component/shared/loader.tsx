import styles from "../../styles/components/loader.module.scss";
import type { LoadingProps } from "../../types/layout";

export default function LoaderBar({
  fixedTop = false,
  label = "Loading",
}: LoadingProps) {
  return (
    <div className={styles.loaderHolder}>
      <span>{label}</span>
      <div
        className={`${styles.loaderTrack} ${fixedTop ? styles.fixedTop : ""}`}
        role="progressbar"
        aria-label={label}
        aria-busy="true"
      >
        <div className={styles.loaderBar} />
      </div>
    </div>
  );
}
