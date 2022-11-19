import React from "react";
import AnswerService from "../../services/AnswerService";
import QuestionService from "../../services/QuestionService";
import QuestionGrade from "./QuestionGrade";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import "./GradingPage.css";
import { useAuth } from "../../auth/Auth";
import ResultService from "../../services/ResultService";

function GradingPage (props) {
    let questionService = new QuestionService();
    let resultService = new ResultService();
    let auth = useAuth();

    let [questions, setQuestions] = useState([]);
    let [answers, setAnswers] = useState([]);
    let [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        questionService.getQuestions(props.exam.id).then((data) => {
            setQuestions(data);
            console.log("questions", data);
        });
        resultService.getResults(auth.user.access_token, props.exam.id).then((data) => {
            console.log("answers", data);
            setAnswers(data);
            setSelectedAnswer(data[0]);
        });
    }, [props.exam.id]);

    let prevAnswer = () => {
        saveGrades();
        let index = answers.indexOf(selectedAnswer);
        if (index > 0) {
            setSelectedAnswer(answers[index-1]);
        }
    }

    let nextAnswer = () => {
        saveGrades();
        let index = answers.indexOf(selectedAnswer);
        if (index < answers.length-1) {
            setSelectedAnswer(answers[index+1]);
        }
    }

    let getAnswerIndex = () => {
        return answers.indexOf(selectedAnswer)+1;
    }

    let saveGrades = () => {
        let grades = questions.map((question) =>  
        {
            return{
                id: question.resultId,
                score: parseInt(question.result),
            }
        });

        resultService.saveGrades(auth.user.access_token, grades).then((data) => {
            console.log("grades saved", data);
        });
    }

    return (
        <div className="grading-page">
            <div className="grading-page-answers">
                    <QuestionGrade answer={selectedAnswer} questions={questions}/>
            </div>
            <div className = "grading-page-additional-controls">
                <Button variant="contained" fullWidth={true} className="grading-page-additional-controls-button" onClick={() => props.setSelected(3)}>
                    <HomeIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Wycofaj</div>
                </Button>
                <div className="grading-page-additional-controls-text">
                    Egzaminowany {getAnswerIndex()}/{answers.length}
                </div>
                <div className="grading-page-additional-controls-text">
                    Pozostało pytań do oceny: {questions.length}
                </div>
                <Button variant="contained" fullWidth={true} color="secondary" className="grading-page-additional-controls-button" onClick={prevAnswer}>
                    <ArrowBackIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Poprzedni</div>
                </Button>
                <Button variant="contained" fullWidth={true} color="secondary" className="grading-page-additional-controls-button" onClick={nextAnswer}>
                    <ArrowForwardIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Następny</div>
                </Button>
            </div>
        </div>
    );
}

export default GradingPage;