import React, { useEffect } from "react";
import styles from "../styles/checkout.module.css";
import Image from "next/image";
import BackArrow from "@/components/BackArrow";

import { useRouter } from "next/router";

function CheckInFinish() {
  const router = useRouter();
  const handleFrontPage = () => {
    router.push("/");
  };

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [router]);
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Tak for hjælpen. Du kan nu begynde reparationen
      </h1>
      <Image
        src="../confirmed.svg"
        alt=""
        className={styles.image}
        width={5}
        height={5}
      />
      <button className="button__next button__big" onClick={handleFrontPage}>
        Til Forsiden
      </button>
    </div>
  );
}

export default CheckInFinish;
