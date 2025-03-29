import { useState } from 'react';
import './App.css'
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './Api';
import { QuestionState,Diffculty } from './Api';


export type AnswerObject={
  question:string,
  answer:string,
  correct:boolean,
  correctAnswer:string,
}

const Total_Ques=10;
function App() {
const[loading,setLoading]=useState(false);
const[questions,setQuestions]=useState<QuestionState[]>([]);
const[userAns,setuserAns]=useState<AnswerObject[]>([]);
const[number,setNumber]=useState(0);
const[score,setScore]=useState(0);
const[gameOver,setGameOver]=useState(true);

// console.log(questions);

  const startTrivia=async()=>{
setLoading(true);
setGameOver(false);
const newQuestions=await fetchQuizQuestions(
  Total_Ques,
  Diffculty.EASY
);
setQuestions(newQuestions);
setScore(0);
setuserAns([]);
setNumber(0);
setLoading(false);

  };

  const checkAnswer =(e:React.MouseEvent<HTMLButtonElement>)=>{

    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setuserAns((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion=()=>{
    const nextQ = number + 1;

    if (nextQ === Total_Ques) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  return (
    <>
      <div className="app">
    <h1>Your Quiz</h1>
    {gameOver || userAns.length===Total_Ques?(
      <button className='start' onClick={startTrivia}>Start</button>

    ):null}
    {!gameOver?<p className="score">Score:{score}</p>:null}
    {loading &&<p className='loader'>Loading Questions.....</p>}
    {!loading && !gameOver && (
     <QuestionCard
    questionNo={number+1}
    totalQuestions={Total_Ques}
    question={questions[number].question}
    answers={questions[number].answers}
    userAns={userAns?userAns[number]:undefined}
    callback={checkAnswer}
    /> 
  )}
    {!gameOver && !loading && userAns.length === number + 1 && number !== Total_Ques - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

      </div>
    </>
  )
}

export default App
