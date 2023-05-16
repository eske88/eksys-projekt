import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const API_KEY = "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";

type AnswerObject = {
  [key: string]: any;
};

type Props = {
  onNext: (answer: AnswerObject) => void;
  onPrev: () => void;
  answers: Answers;
};

interface Answers {
  [key: number]: any;
}

const Question1 = ({ onNext, onPrev, answers }: Props) => {
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [maxTokens, setMaxTokens] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `[  "Spillekonsol",  
        "Ur",  
        "Symaskine",  
        "Strygejern",  
        "Kaffemaskine",  
        "Stationær computer",  
        "Fladskærm 15-17", "Fladskærm 19-20", "Fladskærm 22-24", 
         "Laptop stor", "Laptop mellemstor", "Laptop lille",  
         "Papirskærer","PC-tilbehør",  "Printer/scanner",  
        "Digital kompaktkamera",  
         "DSLR eller videokamera",  
         "Håndholdt underholdningsenhed",  
         "Hovedtelefoner",  
         "Mobiltelefon",  
         "Tablet",  
         "Fladskærm 26-30",  
         "Fladskærm 32-37",  
         "Hi-Fi integreret",  
         "Hi-Fi adskilte enheder",  
         "Musikinstrument",  
         "Bærbar radio",  
         "Projektor",  
         "TV- og gaming-tilbehør",  
         "Aircondition/dehumidifier",  
         "Dekorativ eller sikkerhedsbelysning",  
         "Ventilator",  
         "Hår- og skønhedsprodukt",  
         "Elkedel",  "Lampe",  "Elværktøj",  "Lille køkkenredskab",  "Brødrister",  "Legetøj",  "Støvsuger",  "Diverse",  "Møbler",  "Cykel",  "Tøj eller tekstil",  "Diverse",  "Håndværktøj"]
         . Vælg den bedst mulige kategori til at kategorisere ordret: ${answer}. Svar mig kun med navnet på katogorien og intet andet`,
        max_tokens: maxTokens,
      }),
    };

    fetch("https://api.openai.com/v1/completions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const firstCompletion = data.choices[0].text.trim();
        const cleanedString = firstCompletion.replace(/[^\w\sæøå]/gi, "");
        const trimmedWord = cleanedString.trim();
        setCategory(trimmedWord);
        onNext({ name: answer, kategori: trimmedWord });
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
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

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div>
      <Layout
        handlePrev={handlePrev}
        questionName={<h1>Hvilken genstand skal du reparere?</h1>}
        info={
          <h2>
            Intast navnet på den slags genstand der skal fikses feks.
            Løbebukser, Cykellygte ...{" "}
          </h2>
        }
        inputField={
          <div className="container__stacked">
            <input
              type="text"
              placeholder="F.eks. bukser..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`${answer && "active"} button__next`}
              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Næste"}
            </button>
            <p className={`error-message ${!error && "fade-out"}`}>
              Husk at udfylde tekstfeltet
            </p>
          </div>
        }
        search={false}
      />
    </div>
  );
};

export default Question1;

// <div className="searchResultsContainer">
// <div className="searchResults">
//   {filtered.map((item) => (
//     <div
//       className={
//         item === selectedItem
//           ? "searchResultChoosen"
//           : "searchResult"
//       }
//       key={item.id}
//       onClick={() => {
//         handleClickedOption(item);
//       }}
//     >
//       {item.name}
//     </div>
//   ))}
// </div>
// </div>
// <div className="amountOfOptions">
// <h6>{filtered.length}/46 muligheder</h6>
// </div>

// const handleClickedOption = (item: Item) => {
//   setSelectedItem(item);
//   setSelectedItemTitle(`Hvilken genstand skal du reparere`);
// };

// const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setAnswer(event.target.value);
// };

// const handleNext = () => {
//   if (selectedItem) {
//     onNext(selectedItem.name);
//   } else {
//     setError(true);
//   }
// };

// useEffect(() => {
//   setFiltered(
//     katogoriData?.filter((item) => {
//       return item?.name?.toLowerCase().includes(answer.toLowerCase().trim());
//     })
//   );
// }, [katogoriData, answer]);

// // Checks if the user has selected an item and if so - sets the item as selected
// useEffect(() => {
//   if (answers[1]) {
//     const item = katogoriData.find((obj) => obj.name === answers[1]);
//     setSelectedItem(item);
//     setSelectedItemTitle(`Jeg skal reparere: ${item?.name}`);
//   }
// }, []);
