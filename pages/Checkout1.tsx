import React from "react";
import styles from "../styles/checkout.module.css";
import { useRouter, withRouter  } from "next/router";
import Image from "next/image";
import BackArrow from "@/components/BackArrow";

function Checkout1() {
  const router = useRouter();

  const { name } = router.query;

  const handleYes = () => {
    router.push({pathname: `/CheckoutFinish`, query: { name: name, rep: '8' }})
  };

  const handleNo = () => {
    router.push({pathname: `/Checkout2`, query: { name: name }})
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Fik du repareret din genstand?</h1>
      <div className={styles.back__image}>
        <BackArrow />
      </div>

      <div className={styles.flex__container}>
        <button
          className={`${styles.button} ${styles.green__button}`}
          onClick={handleYes}
        >
          Ja
        </button>
        <button
          className={`${styles.button} ${styles.grey__button}`}
          onClick={handleNo}
        >
          Nej
        </button>
      </div>
    </div>
  );
}

export default Checkout1;
