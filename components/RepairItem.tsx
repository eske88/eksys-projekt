import { useRouter } from "next/router";
import styles from "../styles/repairItem.module.css";
import timeago from "timeago.js";
import { useEffect, useState } from "react";

interface RepairItemProps {
  navn: string;
  mærke: string;
  timestamp: number;
}

function RepairItem({ navn, mærke, timestamp }: RepairItemProps) {
  const router = useRouter();

  const handleNext = () => {
    router.push({ pathname: `/Checkout1`, query: { name: navn } });
  };

  function timeAgoString(secondsSince1970: number): string {
    const secondsPerMinute = 60;
    const secondsPerHour = secondsPerMinute * 60;
    const secondsPerDay = secondsPerHour * 24;
    const secondsPerWeek = secondsPerDay * 7;
    const secondsPerMonth = secondsPerDay * 30;
    const secondsPerYear = secondsPerDay * 365;

    const now = Math.floor(Date.now() / 1000);
    const secondsAgo = now - secondsSince1970 / 1000;

    if (secondsAgo < secondsPerMinute) {
      return "Lige nu";
    } else if (secondsAgo < secondsPerHour) {
      const minutes = Math.floor(secondsAgo / secondsPerMinute);
      return `${minutes} Minut${minutes > 1 ? "ter" : ""} siden`;
    } else if (secondsAgo < secondsPerDay) {
      const hours = Math.floor(secondsAgo / secondsPerHour);
      return `${hours} Time${hours > 1 ? "r" : ""} siden`;
    } else if (secondsAgo < secondsPerWeek) {
      const days = Math.floor(secondsAgo / secondsPerDay);
      return `${days} Dag${days > 1 ? "e" : ""} siden`;
    } else if (secondsAgo < secondsPerMonth) {
      const weeks = Math.floor(secondsAgo / secondsPerWeek);
      return `${weeks} Uge${weeks > 1 ? "r" : ""} siden`;
    } else if (secondsAgo < secondsPerYear) {
      const months = Math.floor(secondsAgo / secondsPerMonth);
      return `${months} Måned${months > 1 ? "er" : ""} siden`;
    } else {
      const years = Math.floor(secondsAgo / secondsPerYear);
      return `${years} År${years > 1 ? "" : ""} siden`;
    }
  }

  return (
    <div onClick={handleNext} className={styles.data__container}>
      <div className={styles.name}>
        <p>{navn}</p>
      </div>
      <div className={styles.coloum__container}>
        <p>{mærke}</p>
      </div>
      <div className={styles.time}>
        <p>{timeAgoString(timestamp)}</p>
      </div>
    </div>
  );
}

export default RepairItem;
