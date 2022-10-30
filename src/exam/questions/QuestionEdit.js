import React from "react";
import { useState, useEffect } from "react";
import { MenuItem, TextField, Checkbox, Radio } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './QuestionEdit.css';

function QuestionEdit(props) {
    let [questionType, setQuestionType] = useState(props.question.type);

    let handleQuestionTypeChange = (e) => {
        props.question.type = e.target.value;
        setQuestionType(e.target.value);
    };

    return (
        <div className="question-edit">
            <div className="question-edit-type">
                {props.questionPos}
                <TextField
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                    select // tell TextField to render select
                    label="Typ pytania"
                    size="small"
                    >
                    <MenuItem value={1}>Jednokrotny wybór</MenuItem>
                    <MenuItem value={2}>Wielokrotny wybór</MenuItem>
                    <MenuItem value={3}>Pytanie otwarte</MenuItem>
                </TextField>
                <TextField id="outlined" size="small" type="number" variant="outlined" value={props.question.points} label="Punkty" />
                <DeleteIcon color="secondary"/>
            </div>
            <TextField id="outlined" multiline={true} rows={3}  size="big" fullWidth={true} variant="outlined" value={props.question.question} label="Pytanie" />
            {props.question.type != 3 ?
            <div className="question-edit-answers">
                answers
                {props.question.answers.map((answer, key) => {
                    console.log(answer);
                    return (
                        <div className="question-edit-answer" key={key}>
                            {props.question.type == 2 ?
                                <Checkbox checked={answer.correct} color="secondary"/>:
                                <Radio checked={answer.correct} color="secondary"/>
                                }
                            <TextField id="outlined-basic" size="small" variant="outlined" value={answer.answer} label="Odpowiedź" />
                        </div>
                    );
                })}
                <div className="question-new-answer">
                    {props.question.type == 2 ?
                        <Checkbox disabled={true}/>:
                        <Radio disabled={true}/>
                    }
                    <TextField id="outlined-basic" size="small" variant="outlined" label="Nowa odpowiedź" />
                </div>
            </div> : null   
            }        
        </div>
    );
}

export default QuestionEdit;