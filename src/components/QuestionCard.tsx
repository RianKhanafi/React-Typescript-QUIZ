import React from "react";
import {AnsweerObject} from "../App"
import {Wrapper, ButtonWrapper} from "./QuestionCard.styles"
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: AnsweerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNr}/ {totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }} />

      <div>
        {answers.map((answer, key) => (
          <ButtonWrapper 
            correct={userAnswer?.correctAnswer == answer}
            userClicked={userAnswer?.answer === answer}
            key={key}>
            {/* // atau userAnswer ? true : false */}
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}}/>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
