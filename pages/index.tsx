import { Inter } from "next/font/google";
import styles from "../styles/index.module.css";
import { useRouter } from "next/router";

import axios from "axios";
import * as XLSX from "xlsx";
//import { saveAs } from "file-saver";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/database";
import { getDatabase, onValue, ref } from "firebase/database";
import Image from "next/image";

export default function Home() {
  const [data1, setData] = useState([]);
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

  /*
  // Fetch data from the database
  const fetchData = () => {
    const db = getDatabase();
    const dataRef = ref(db, "/users");
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        convertToExcel(data);
        setData(data);
      },
      {
        onlyOnce: true, // fetch data only once instead of real-time updates
      }
    );
  };

  const convertToExcel = (data) => {
    const headers = ["name", "kategori", "mærke", "repair", "timestamp"];
    const rows = Object.values(data).map((item) => [
      item.name,
      item.kategori,
      item.mærke,
      item.repair,
      new Date(item.timestamp).toLocaleDateString(),
    ]);
    const workSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    //Virker ikke, skulle få header  til at få lidt farve
    const headerStyle = {
      fill: {
        fgColor: { rgb: "FFA07A" },
      },
      font: {
        color: { rgb: "FFFFFF" },
      },
    };
    const headerRange = workSheet["!ref"]
      ? XLSX.utils.decode_range(workSheet["!ref"])
      : null;
    if (headerRange) {
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
        workSheet[cell].s = headerStyle;
      }
    }

    workSheet["!cols"] = [
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
    const excelFile = XLSX.write(workBook, {
      type: "binary",
      bookType: "xlsx",
    });
    const buffer = new ArrayBuffer(excelFile.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelFile.length; i++) {
      view[i] = excelFile.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "data.xlsx");
  };
  */

  const router = useRouter();

  const handleStart = () => {
    router.push(`/Questionnaire`);
  };

  const handleCheckout = () => {
    router.push(`/Checkout`);
  };

  return (
    <div className={styles.container}>
      {/*}
      <div className={styles.export__data__container}>
        <img
          src="../Excel.png"
          alt=""
          className={styles.export__data}
          onClick={() => {
            fetchData();
          }}
        />
      </div>
        */}
      <h1 className={styles.header}>Velkommen til Reparations.Konsortiet</h1>
      <Image
        src="/repair-logo.png"
        alt=""
        className={styles.icon}
        width={1000}
        height={1000}
      />
      <p className={styles.normal__text}>
        Vi har behov for at registrere data for at kunne analysere hvilke ting
        der kan laves og ikke laves.
      </p>
      <p className={styles.normal__text}>Vælg venligst hvad du ønsker</p>
      <div className={styles.flex__container}>
        <button
          className={`${styles.button} ${styles.green__button}`}
          onClick={handleStart}
        >
          <p>Begynd en reparation</p>
          <div className={styles.icon__container}>
            <Image
              src="../door.svg"
              alt=""
              className={styles.image}
              width={5}
              height={5}
            />
            <Image
              src="../arrow.svg"
              alt=""
              className={styles.image}
              width={5}
              height={5}
            />
          </div>
        </button>

        <button
          className={`${styles.button} ${styles.grey__button}`}
          onClick={handleCheckout}
        >
          <div className="">
            <p>Afslut en reparation</p>
          </div>
          <div className={styles.icon__container}>
            <Image
              src="../door-brown.svg"
              alt=""
              width={5}
              height={5}
              className={`${styles.image} ${styles.brown}`}
            />
            <Image
              src="../arrow-right.svg"
              alt=""
              width={5}
              height={5}
              className={`${styles.image} ${styles.brown}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
