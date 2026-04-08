import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  { id: 1, text: "How satisfied are you?", type: "rating-5" },
  { id: 2, text: "Recommend us?", type: "rating-10" }
];

function App() {
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (val) => {
    setAnswers({ ...answers, [questions[index].id]: val });
  };

  const next = () => {
    if (index < questions.length - 1) setIndex(index + 1);
    else setSubmitted(true);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const skip = () => {
    if (window.confirm("Exit survey?")) {
      setStart(false);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setStart(false);
        setSubmitted(false);
        setIndex(0);
      }, 3000);
    }
  }, [submitted]);

  if (!start)
    return (
      <div className="container">
        <h1>🛍️ Survey</h1>
        <button onClick={() => setStart(true)}>Start</button>
      </div>
    );

  if (submitted)
    return (
      <div className="container">
        <h1>🎉 Thank You!</h1>
      </div>
    );

  const q = questions[index];

  return (
    <div className="container">
      <h3>{index + 1}/{questions.length}</h3>
      <h2>{q.text}</h2>

      {[...Array(q.type === "rating-5" ? 5 : 10)].map((_, i) => (
        <button key={i} onClick={() => handleAnswer(i + 1)}>
          {i + 1}
        </button>
      ))}

      <br />
      <button onClick={prev}>⬅ Prev</button>
      <button onClick={skip}>❌ Skip</button>
      <button onClick={next}>Next ➡</button>
    </div>
  );
}

export default App;