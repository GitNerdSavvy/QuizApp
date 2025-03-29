import React from "react";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAns: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAns,
  questionNo,
  totalQuestions,
}) => (
  <div className="QuestionCard">
    <p className="number">Question: {questionNo}/{totalQuestions}</p>
    <p className="questionTitle" dangerouslySetInnerHTML={{ __html: question }} />
    <div>
    {Array.isArray(answers) &&
      answers.map((answer) => (
        <div className="ansCard" key={answer}>
          <button 
          className="ansButton"
            disabled={!!userAns} 
            value={answer} 
            onClick={(e) => callback(e)}
          >
            <span className="ans" dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
