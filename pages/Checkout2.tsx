import React from "react";
import styles from "../styles/checkout.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import BackArrow from "../components/BackArrow";
import { useEffect, useState } from "react";

function Checkout2() {
  const router = useRouter();
  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { name } = router.query;

  const divData = [
    "Reservedel er ikke tilgengælig",
    "Reservedel er for dyr",
    "Ikke muligt at åbne genstanden",
    "Mangler information for udførelse af reparation",
    "Genstanden er for slidt",
    "Mangler udstyr",
    "Genstand er reparerbar, men jeg løb tør for tid",
  ];

  const handleNext = () => {
    router.push({
      pathname: `/CheckoutFinish`,
      query: { name: name, rep: selectedDiv },
    });
  };

  const handleClick = (index: number) => {
    setSelectedDiv(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationAndInfo}>
        <div className={styles.back__image2}>
          <BackArrow />
        </div>
        <div className={styles.info__container}>
          <Image
            className={styles.image2}
            src="/infoButton.png"
            alt="Information button"
            width={25}
            height={40}
            onMouseEnter={() => {
              setIsHovered((prevState) => !prevState);
            }}
            onMouseLeave={() => {
              setIsHovered((prevState) => !prevState);
            }}
          />
          {isHovered && (
            <div className={styles.info}>
              Her skal du trykke på den grund, der gjorde at du ikke kunne fikse
              din genstand
            </div>
          )}
        </div>
      </div>
      <h1 className={styles.header_last}>
        Hvorfor fik du ikke repareret din genstand
      </h1>

      <div className={styles.reasons_container}>
        <>
          {divData.map((item, index) => (
            <div
              key={index + 1}
              className={`${styles.reason} ${
                selectedDiv === index + 1 ? styles.reason_active : ""
              }`}
              onClick={() => handleClick(index + 1)}
            >
              <p className={styles.reason_text}>{item}</p>
            </div>
          ))}
        </>
      </div>
      <button
        disabled={selectedDiv === null}
        className={
          selectedDiv === null
            ? `${styles.button} ${styles.done_button}`
            : `${styles.button} ${styles.done_button_active}`
        }
        onClick={handleNext}
      >
        Afslut
      </button>
    </div>
  );
}

export default Checkout2;
