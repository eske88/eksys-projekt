import React, { useEffect, useState } from "react";
import styles from "../styles/checkout.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import BackArrow from "../components/BackArrow";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  serverTimestamp,
  set,
  onValue,
  orderByChild,
  equalTo,
  query,
  startAt,
  get,
} from "firebase/database";
import "firebase/database";
import RepairItem from "../components/RepairItem";

interface DataItem {
  id: string;
  navn: string;
  mærke: string;
  timestamp: number;
}

function Checkout() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filtered, setFiltered] = useState<DataItem[]>([]);
  const [text, setText] = useState<String>("");

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC-LAGswFUuDAGymJAAiN_L7hg814k2i6c",
    authDomain: "repair-cafe-dbab1.firebaseapp.com",
    databaseURL:
      "https://repair-cafe-dbab1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "repair-cafe-dbab1",
    storageBucket: "repair-cafe-dbab1.appspot.com",
    messagingSenderId: "969041831458",
    appId: "1:969041831458:web:e555219265c997b19fcc7b",
    measurementId: "G-3H1V4E9YRS",
  };

  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "/users");

    const underRepair = query(dataRef, orderByChild("repair"), equalTo("0"));

    const backLater = query(dataRef, orderByChild("repair"), equalTo("7"));

    console.log(underRepair);

    onValue(underRepair, (snapshot0) => {
      const data0 = snapshot0.val() || {};

      onValue(backLater, (snapshot7) => {
        const data7 = snapshot7.val() || {};
        const newData = Object.keys({ ...data0, ...data7 }).map(
          (key) => ({ id: key, ...(data0[key] || data7[key]) } as DataItem)
        );
        setData(newData);
      });
    });
  }, []);

  useEffect(() => {
    setFiltered(
      data
        ?.filter((item) => {
          return item?.id?.toLowerCase().includes(text.toLowerCase().trim());
        })
        ?.sort((a, b) => b.timestamp - a.timestamp) // sort by timestamp in descending order
    );
    console.log(data);
    console.log(filtered);
  }, [data, text]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Find din Genstand</h1>
      <div className={styles.back__image}>
        <BackArrow />
      </div>
      <div className="input__container__small">
        <input
          type="text"
          onChange={handleTextChange}
          placeholder="Søg efter genstand..."
          className="small__input"
        />
        <Image
          className={styles.searchImage}
          src="/search.png"
          alt="Information button"
          width={25}
          height={40}
        />
      </div>
      <div>
        {/* <div className={styles.data__container}>
          <div className={styles.coloum__container}>
            <h2 className={styles.typeHeader}>Genstand</h2>
          </div>
          <div className={styles.coloum__container}>
            <h2 className={styles.typeHeader}>Model</h2>
          </div>
          <div className={styles.coloum__container}>
            <h2 className={styles.typeHeader}>Dato</h2>
          </div>
        </div> */}

        <div className={styles.data}>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <RepairItem
                key={index}
                navn={item.id}
                mærke={item.mærke}
                timestamp={item.timestamp}
              />
            ))
          ) : (
            <p className="text__center big">Ingen genstand med navnet{text}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
