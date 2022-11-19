import React from "react";
import { useState, useEffect } from "react";
import { TextField, Divider, Checkbox, Radio } from "@mui/material";
import "./QuestionGrade.css";

function QuestionGrade (props){

    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (props.questions == null || props.answer == null) return;
        let questionsData = [...props.questions];
        for (let question of questionsData){;
            let answer = props.answer.answers.find(answer => answer.questionId === question.id);
            console.log("answer", answer);
            question.userAnswers = answer.answers;
            question.result = answer.result;
            question.resultId = answer.resultId;
            console.log(question, answer);
        }
        setQuestions(questionsData);
    }, [props.questions, props.answer]);

    let isAnswerChecked = (question, answer) => {
        return question.userAnswers.includes(answer.id.toString());
    }

    let handlePointsChange = (e, question) => {
        question.result = e.target.value;
        let newQuestions = questions.map(q => q.id === question.id ? question : q);
        setQuestions(newQuestions);
    }

    return (
        <div className="question-grades">
            {questions.map((question) => {
                console.log("q", question);
                return <div className="question-grade" key={question.questionId}>
                    <div className="grade-points">
                        <TextField id="outlined" type="number" label="Punkty" variant="outlined" value={question.result ?? ""} size="small" onChange={(e)=>handlePointsChange(e, question)}/>
                        <div className="question-grade-points">
                            /{question.points}
                        </div>
                    </div>
                    <Divider/>
                    <div className="question-grade-question">
                        {question.question}
                    </div>
                    <Divider/>
                    <div className="question-grade-answers">
                        {question.type !== 2 ? 
                        question.answers.map((answer) => (
                            <div className="question-grade-answer" key={answer.answerId}>
                                {question.type === 1 ?
                                    <Checkbox checked={isAnswerChecked(question, answer)} color="secondary"/>:
                                    <Radio checked={isAnswerChecked(question, answer)} color="secondary"/>
                                }
                                {answer.answer}
                            </div>
                        )) : 
                            <div className="question-grade-answer">
                                {question.userAnswers[0]}
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
    );
}

export default QuestionGrade;