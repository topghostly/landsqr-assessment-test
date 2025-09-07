import React from "react";
import styles from "../../styles/components/loader.module.scss";

type Props = {
  fixedTop?: boolean;
  label?: string;
};

export default function LoaderBar({
  fixedTop = false,
  label = "Loading",
}: Props) {
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
