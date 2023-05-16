import { useEffect, useState } from "react";
import Layout from "../components/Layout";

type AnswerObject = {
  [key: string]: any;
};

type Props = {
  onSubmit: (answer: AnswerObject) => void;
  onPrev: () => void;
  answers: AnswerObject;
};

// type Props = {
//   onPrev: () => void;
//   onSubmit: (answer: any) => void;
//   answers: Answers;
// };

interface Answers {
  [key: number]: any;
}

const Question3 = ({ onPrev, onSubmit, answers }: Props) => {
  const [answer, setAnswer] = useState("");

  const [error, setError] = useState<boolean>(false);

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
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const containsLetter: boolean = /[a-zA-ZæøåÆØÅ]/.test(answer);
    if (answer.length > 0 && !containsLetter) {
      // onSubmit(Number(answer));
      onSubmit({ weight: Number(answer) });
    } else {
      setError(true);
    }
  };
  const handlePrev = () => {
    onPrev();
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Layout
      handlePrev={handlePrev}
      questionName={<h1>Hvor meget vejer din(e): {answers?.name}?</h1>}
      inputField={
        <div className="container__stacked">
          <div className="container__nonstacked">
            <input
              className="singleLine"
              type="text"
              placeholder="Vægt..."
              value={answer}
              onChange={handleAnswerChange}
              onKeyDown={handleKeyDown}
            />
            <text style={{ marginLeft: 10 }}>g.</text>
          </div>
          <h5
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "-10px",
            }}
          >
            Læg genstand på vægten, og indtast hvor meget den vejer i g.
          </h5>
          <button
            className={`${answer && "active"} button__next`}
            onClick={handleSubmit}
          >
            Indsend
          </button>
          <p className={`error-message ${!error && "fade-out"}`}>
            Husk at udfylde tekstfeltet og kun angive tal
          </p>
        </div>
      }
      info={
        <>
          {
            <h2>
              Her skal du indskrive vægten af din genstand i kilogram. Læg din
              genstand op på vægten, der står til venstre for computeren og
              indskriv hvad din genstand vejer.
            </h2>
          }
        </>
      }
      search={false}
    />
  );
};

export default Question3;
