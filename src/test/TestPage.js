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

function TestPage() {

    let questionService = new QuestionService();
    let examService = new ExamService();

    let [timeLeft, setTimeLeft] = useState(3600);
    let [questionNumber, setQuestionNumber] = useState(0);
    let [questionAmount, setQuestionAmount] = useState(0);
    let [examStatus, setExamStatus] = useState("W trakcie");

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
        let userId = params.userId;
        let examId = params.examId;
        examService.getExam(examId).then((exam) => {
            setExamStatus(exam.status);
            if (exam.status === "W trakcie") {
                questionService.getQuestions(examId).then((data) => {
                    setQuestions(data);
                    setQuestionNumber(1);
                    setQuestionAmount(data.length);
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

    let nextQuestion = () => {
        if(questionNumber < questionAmount){
            setQuestionNumber(questionNumber + 1);
        }
    }

    let previousQuestion = () => {
        if(questionNumber > 1){
            setQuestionNumber(questionNumber - 1);
        }
    }

    return <div className="test-page">
        <UserHeader name={""} logged={false} resetPage={() =>{}}/>
        {examStatus === "W trakcie"?
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
                <Button variant="contained" color="secondary" sx={
                    {
                        width: "260px",
                        margin: "10px",
                    }}><DoneIcon/>Zakończ egzamin</Button>
            </div>
            <div id="content">
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
                        {questions ? questions[questionNumber-1].type !== 3 ? questions[questionNumber-1].answers.map((answer) => {
                            return (
                                <div className="content-question-answer">
                                    {questions[questionNumber-1].type === 1 ?
                                    <input type="radio" name="answer" value={answer.answerId}/> : 
                                    <input type="checkbox" name="answer" value={answer.answerId}/>}
                                    {answer.answer}
                                </div>);
                        }) : <TextField label="Wprowadź odpowiedź"/> : null} 
                    </div>
                </div>
            </div>
        </div>
        : 
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Egzamin niedostępny</h1>
        </div>
        }
    </div>
}

export default TestPage;