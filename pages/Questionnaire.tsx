import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../components/backArrow.module.css";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  serverTimestamp,
  set,
  onValue,
} from "firebase/database";
import "firebase/database";

interface Answers {
  [key: string]: any;
}

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const router = useRouter();

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

  const handleSubmit = (answer: any) => {
    const answersObject = Object.fromEntries(Object.entries(answers));

    const db = getDatabase();
    const reference = ref(db, "users/" + Object.values(answersObject)[0]);
    set(reference, {
      ...answersObject,
      repair: "0",
      timestamp: serverTimestamp(),
    });
    router.push("/CheckInFinish");
  };

  const handleNextQuestion = (answerObj: Answers) => {
    setAnswers((prevState) => ({ ...prevState, ...answerObj }));
    setCurrentQuestion((prevState) => prevState + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion !== 1) {
      setCurrentQuestion((prevState) => prevState - 1);
    } else {
      router.back();
    }
  };

  let currentComponent;
  switch (currentQuestion) {
    case 1:
      currentComponent = (
        <Question1
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          answers={answers}
        />
      );
      break;
    case 2:
      currentComponent = (
        <Question2
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          answers={answers}
        />
      );
      break;
    case 3:
      currentComponent = (
        <Question3
          onSubmit={handleSubmit}
          onPrev={handlePrevQuestion}
          answers={answers}
        />
      );
      break;
    default:
      currentComponent = (
        <Question1
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          answers={answers}
        />
      );
  }

  return (
    <div className="container">
      <div>{currentComponent}</div>
    </div>
  );
}

// const handleNextQuestion = (key: string, value: string) => {
//   setAnswers((prevState) => ({ ...prevState, [key]: value }));
//   setCurrentQuestion((prevState) => prevState + 1);
// };
// set(reference, {
//   navn: answers[1],
//   kategori: answers[2],
//   mærke: answers[3],
//   vægt: answers[4],
//   repair: "0",
//   timestamp: serverTimestamp(),
// });

// const handleNextQuestion = (answer1: any, answer2?: any) => {
//   console.log(answers);
//   setAnswers((prevState) => ({
//     ...prevState,
//     [currentQuestion]: answer1,
//     [currentQuestion + 5]: answer2,
//   }));
//   setCurrentQuestion((prevState) => prevState + 1);
// };
