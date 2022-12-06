import React from "react";
import { useState, useEffect } from "react";
import UserHeader from "../exam/UserHeader";
import "./TestPage.css";
import QuestionService from "../services/QuestionService";
import { useParams } from "react-router";
import { Button, Divider, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DoneIcon from "@mui/icons-material/Done";
import ExamService from "../services/ExamService";
import { useAuth } from "../auth/Auth";
import ResultService from "../services/ResultService";

function TestPage() {

    let questionService = new QuestionService();
    let examService = new ExamService();
    let resultService = new ResultService();
    let auth = useAuth();

    let [timeLeft, setTimeLeft] = useState(3600);
    let [questionNumber, setQuestionNumber] = useState(0);
    let [questionAmount, setQuestionAmount] = useState(0);
    let [examStatus, setExamStatus] = useState("W trakcie");
    let [message, setMessage] = useState("Egzamin niedostępny");
    let [textAnswer, setTextAnswer] = useState("");

    let [questions, setQuestions] = useState(null);
    const params = useParams();

    useEffect(() => {
        if(timeLeft > 0){
            setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
    }, [timeLeft]);

    useEffect(() => {
        let examId = params.examId;
        examService.getExam(examId).then((exam) => {
            setExamStatus(exam.status);
            if (exam.status === "W trakcie") {
                questionService.getQuestions(examId).then((data) => {
                    let questions = [...data];
                    setQuestions(questions);
                    setQuestionAmount(questions.length);
                    if (questions.length > 0){
                        setQuestionNumber(1);
                    }
                });
            }
        });
    }, []);

    let formatTime = (time) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;
        return hours > 0 ? (hours + ":") : "" 
        + minutes + ":" + seconds;
    }

    let saveResult = (question) => {
        let results = question.answers.map(v => {
            return {
                answer: v.correct ? v.id : null,
                questionId: question.id,
                examinedId: params.userId
            }
        });
        if (question.type == 2){
         results.push({
                answer: textAnswer,
                questionId: question.id,
                examinedId: params.userId
            });
        }

        results = results.filter(v => v.answer != null);

        console.log("results", results);

        resultService.addResults(results).then((data) => {
            return;
        });
    }

    let nextQuestion = () => {
        saveResult(questions[questionNumber-1]);
        if(questionNumber < questionAmount){
            setQuestionNumber(questionNumber + 1);
        }
    }

    let previousQuestion = () => {
        saveResult(questions[questionNumber-1]);
        if(questionNumber > 1){
            setQuestionNumber(questionNumber - 1);
        }
    }

    let endExam = () => {
        saveResult(questions[questionNumber-1]);
        setMessage("Odpowiedzi wysłane, dziękujemy za wypełnienie egzaminu");
        setExamStatus("Wypełniony");
    }

    let handleAnswerChange = (event) => {
        setTextAnswer(event.target.value);
    }

    let setAnswer = (e, answer) => {
        answer.correct = e.target.checked;
        console.log(answer.correct);
    }

    let setRadioAnswer = (e, answer, answers) => {
        for (var a of answers){
            a.correct = a.id === answer.id
        }
    }

    return <div className="test-page">
        <UserHeader name={""} logged={false} resetPage={() =>{}}/>
        {examStatus != null && examStatus === "W trakcie"?
        <div id="exam-page-content">   
            <div id="content-selector">
                <div id="content-selector-text">
                    Pozostało czasu:
                </div>
                <div id="content-selector-text">
                    {formatTime(timeLeft)}
                </div>
                <div id="content-selector-text">
                    Pytanie {questionNumber}/{questionAmount}
                </div>
                {questionNumber > 0 ?
                <div id = "content-selector-questions-grid">
                    {[...Array(questionNumber-1).keys()].map((questionNo)=>{
                        return <div className="content-selector-questions-grid-item finished">
                            {questionNo+1}
                        </div>
                    })}
                    <div className="content-selector-questions-grid-item current">
                        {questionNumber}
                    </div>
                    {[...Array(questionAmount - questionNumber).keys()].map((questionNo)=>{
                        return <div className="content-selector-questions-grid-item next">
                            {questionNo+questionNumber+1}
                        </div>
                    })}
                </div> : null
                }
                <Button variant="contained" color="secondary" onClick={previousQuestion} sx={
                    {
                        width: "260px",
                        margin: "10px",
                    }}><ArrowBackIcon/>Poprzedni</Button>
                <Button variant="contained" color="secondary" onClick={nextQuestion} sx={
                    {
                        width: "260px",
                        margin: "10px",
                    }}><ArrowForwardIcon/>Następny</Button>
                <Button variant="contained" color="secondary" onClick={endExam} sx={
                    {
                        width: "260px",
                        margin: "10px",
                    }}><DoneIcon/>Zakończ egzamin</Button>
            </div>
            <div id="content">
            {questionNumber > 0 ?
                <div className="content-question">
                    <Divider/>
                    <div className="content-question-text">
                        <div className="question-number">{questionNumber}</div>
                        <div className="question-text">
                            {questions ? questions[questionNumber-1].question : null}
                        </div>
                    </div>
                    <Divider/>
                    <div className="content-question-answers">
                        {questions ? questions[questionNumber-1].type !== 2 ? questions[questionNumber-1].answers.map((answer) => {
                            return (
                                <div className="content-question-answer">
                                    {questions[questionNumber-1].type === 0 ?
                                    <input type="radio" name="answer" value={answer.answerId} checked={answer.correct} onClick={(e)=>setRadioAnswer(e, answer, questions[questionNumber-1].answers)}/> : 
                                    <input type="checkbox" name="answer" value={answer.answerId} checked={answer.correct} onClick={(e)=>setAnswer(e, answer)}/>}
                                    {answer.answer}
                                </div>);
                        }) : <TextField label="Wprowadź odpowiedź" multiline={true} rows={3}  size="big" fullWidth={true} onChange={handleAnswerChange}/> : null} 
                    </div>
                </div>
                : null}
            </div>
        </div>
        : 
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>{message}</h1>
        </div>
        }
    </div>
}

export default TestPage;