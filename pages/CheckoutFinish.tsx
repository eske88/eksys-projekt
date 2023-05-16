import React, { useEffect } from "react";
import styles from "../styles/checkout.module.css";
import Image from "next/image";
import BackArrow from "../components/BackArrow";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  serverTimestamp,
  set,
  onValue,
  update,
} from "firebase/database";
import "firebase/database";

function CheckoutFinish() {
  const router = useRouter();
  const { name, rep } = router.query;

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
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }, []);

  const handleFrontPage = () => {
    router.push("/");
  };

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "users/" + name);
    update(dataRef, {
      repair: rep,
    });

    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>OK hav en god dag. Du kan nu gå</h1>
      <Image
        src="../confirmed.svg"
        alt=""
        className={styles.image}
        width={1005}
        height={1005}
      />
      <button className="button__next button__big" onClick={handleFrontPage}>
        Til Forsiden
      </button>
    </div>
  );
}

export default CheckoutFinish;
