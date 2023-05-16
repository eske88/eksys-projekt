import { useEffect, useState } from "react";
import Layout from "../components/Layout";
type AnswerObject = {
  [key: string]: any;
};

type Props = {
  onNext: (answer: AnswerObject) => void;
  onPrev: () => void;
  answers: AnswerObject;
};

const Question2 = ({ onNext, onPrev, answers }: Props) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<boolean>(false);

  const handlePrev = () => {
    onPrev();
  };
  const handleNext = () => {
    if (answer) {
      onNext({ mærke: answer });
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  useEffect(() => {
    let errorTimer: any;

    if (error) {
      errorTimer = setTimeout(() => {
        setError(false);
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error]);

  return (
    <Layout
      handlePrev={handlePrev}
      questionName={<h1>Hvilket mærke er din(e): {answers?.name}?</h1>}
      inputField={
        <div className="container__stacked">
          <input
            type="text"
            placeholder="F.eks Nike, Apple..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`${answer && "active"} button__next`}
            onClick={handleNext}
          >
            Næste
          </button>
          <p className={`error-message ${!error && "fade-out"}`}>
            Husk at udfylde tekstfeltet
          </p>
        </div>
      }
      info={
        <>
          {
            <h2>
              Her skal du indtaste hvilket mærke din genstand er fra. Altså
              hvilken producent/virksomhed der har har lavet din genstand. Hvis
              du har en højtaler kunne et eksempel på mærke være JBL, Yamaha
              eller B&O
            </h2>
          }
        </>
      }
      search={false}
    />
  );
};

export default Question2;
