import Image from "next/image";
import React, { FC, useState } from "react";
import styles from "../styles/layout.module.css";
import { useRouter } from "next/router";
import BackArrow from "./BackArrow";

interface LayoutProps {
  questionName: JSX.Element;
  info: JSX.Element;
  inputField: JSX.Element;
  search: boolean;
  handlePrev: () => void;
}

const Layout: FC<LayoutProps> = ({
  questionName,
  info,
  inputField,
  search,
  handlePrev,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.navigationAndInfo}>
        <Image
          src="/backButton.png"
          alt="Back button"
          width={30}
          height={48}
          onClick={handlePrev}
          className={styles.image}
        />
        <div className={styles.info__container}>
          <Image
            className={styles.image}
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
          {isHovered && <div className={styles.info}>{info}</div>}
        </div>
      </div>
      <main className={styles.main}>
        <header className={styles.questionName}>{questionName}</header>
        <div className={styles.containerCenter}>
          <div className="input__container__img">
            {inputField}
            {search && (
              <Image
                className="search__image"
                src="/search.png"
                alt="Information button"
                width={25}
                height={40}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
