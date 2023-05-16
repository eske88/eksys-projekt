import Image from "next/image";
import React from "react";
import styles from "./backArrow.module.css";
import { useRouter } from "next/router";

function BackArrow() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <Image
      src="/backButton.png"
      alt="Back button"
      width={30}
      height={48}
      onClick={handleBack}
      className={styles.image}
    />
  );
}

export default BackArrow;
