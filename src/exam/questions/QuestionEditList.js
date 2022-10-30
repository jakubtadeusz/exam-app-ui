import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import QuestionService from "../../services/QuestionService";
import QuestionEdit from "./QuestionEdit";
import './QuestionEditList.css';


function QuestionEditList(props) {
    let questionService = new QuestionService();
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        questionService.getQuestions(props.exam.id).then((data) => {
            setQuestions(data);
        });
    }, [props.exam.id]);

    let addNewQuestion = () => {
        let question = {
            id: -1,
            examId: props.exam.id,
            question: "",
            type: 1,
            points: 1,
            answers: []
        }
        setQuestions([...questions, question]);
    }

    return (
        <div>
            <div className="question-edit-container">
                {questions.map((question, key) => {
                    return (
                        <QuestionEdit question={question} key={key} questionPos={key+1} />
                    );
                })}
            </div>
            <div className="exam-page-additional-controls">
                <Button variant="contained" fullWidth={true} className="exam-page-additional-controls-button" onClick={() => props.setSelected(3)}>
                    <ArrowBackIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Wycofaj</div>
                </Button>
                <Button variant="contained" fullWidth={true} color="secondary" className="exam-page-additional-controls-button" onClick={() => addNewQuestion()}>
                    <AddIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Dodaj nowe pytanie</div>
                </Button>
                <Button variant="contained" fullWidth={true} color="secondary" className="exam-page-additional-controls-button" onClick={() => props.setSelected(3)}>
                    <SaveIcon className="exam-page-additional-controls-icon" />
                    <div className="exam-page-additional-controls-text">Zapisz zmiany</div>
                </Button>
            </div>;
        </div>
    );
}

export default QuestionEditList;