import React from "react";
import { useState, useEffect } from "react";
import { MenuItem, TextField, Checkbox, Radio } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './QuestionEdit.css';
import QuestionService from "../../services/QuestionService";

function QuestionEdit(props) {
    let questionService = new QuestionService();
    let [questionType, setQuestionType] = useState(props.question.type);

    let handleQuestionTypeChange = (e) => {
        props.question.type = e.target.value;
        setQuestionType(e.target.value);

        var q = {...props.question};
        q.type = e.target.value;
        props.setQuestion(q);
    };

    let handlePointsChange = (e) => {
        var q = {...props.question};
        q.points = e.target.value;
        props.setQuestion(q);
    };

    let handleAnswerChange = (e, id) => {
        var q = {...props.question};
        for (let answer of q.answers){
            if (answer.id == id){
                answer.answer = e.target.value;
                break;
            }
        }
        props.setQuestion(q);
    };

    let handleQuestionChange = (e) => {
        var q = {...props.question};
        q.question = e.target.value;
        props.setQuestion(q);
    };

    let handleNewAnswer = (e) => {
        var q = {...props.question};

        questionService.addQuestionAnswer({
            questionId: q.id,
            answer: e.target.value,
            isCorrect: false,
            order: q.answers.length + 1
        }).then((data) => {
            q.answers.push(data);
            props.setQuestion(q);
        });
    };

    return (
        <div className="question-edit">
            <div className="question-edit-type">
                {props.question.order}
                <TextField
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                    select // tell TextField to render select 
                    label="Typ pytania"
                    size="small"
                    >
                    <MenuItem value={0}>Jednokrotny wybór</MenuItem>
                    <MenuItem value={1}>Wielokrotny wybór</MenuItem>
                    <MenuItem value={2}>Pytanie otwarte</MenuItem>
                </TextField>
                <TextField id="outlined" size="small" type="number" variant="outlined" value={props.question.points} label="Punkty" onChange={handlePointsChange}/>
                <DeleteIcon color="secondary" onClick={() => props.removeQuestion(props.question)}/>
            </div>
            <TextField id="outlined" multiline={true} rows={3}  size="big" fullWidth={true} variant="outlined" value={props.question.question} label="Pytanie" onChange={handleQuestionChange} />
            {props.question.type !== 2 ?
            <div className="question-edit-answers">
                {props.question.answers.map((answer) => {
                    return (
                        <div className="question-edit-answer" key={answer.id}>
                            {props.question.type === 1 ?
                                <Checkbox checked={answer.correct} color="secondary"/>:
                                <Radio checked={answer.correct} color="secondary"/>
                                }
                            <TextField id="outlined-basic" size="small" variant="outlined" value={answer.answer} label="Odpowiedź" onChange={(e)=>handleAnswerChange(e, answer.id)}/>
                        </div>
                    );
                })}
                <div className="question-new-answer">
                    {props.question.type === 1 ?
                        <Checkbox disabled={true}/>:
                        <Radio disabled={true}/>
                    }
                    <TextField id="outlined-basic" size="small" variant="outlined" label="Nowa odpowiedź" onClick={handleNewAnswer}/>
                </div>
            </div> : null   
            }        
        </div>
    );
}

export default QuestionEdit;