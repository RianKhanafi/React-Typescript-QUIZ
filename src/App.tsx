import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.styles.ts";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

// styles

import { GlobalStyle,Wrapper } from "./App.styles";
// Components

export type AnsweerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnsweerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOveer] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

  const startTrivia = async () => {
    setLoading(true);
    setGameOveer(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    console.log(newQuestions);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;

      // check answer
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      // save anser in the array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestions = () => {
    // move on to the next question if not the last question

    const nextQuestions = number + 1;

    if (nextQuestions === TOTAL_QUESTIONS) {
      setGameOveer(true);
    } else {
      setNumber(nextQuestions);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestions}>
            Next Questions
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
