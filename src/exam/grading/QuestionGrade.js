import React from "react";
import { useState, useEffect } from "react";
import { TextField, Divider, Checkbox, Radio } from "@mui/material";
import "./QuestionGrade.css";

function QuestionGrade (props){

    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        let questionsData = [...props.questions];
        console.log("questions data", questionsData);
        for (let question of questionsData){;
            let answer = props.answer.answers.find(answer => answer.questionId === question.questionId);
            question.userAnswers = answer.answers;
            question.result = answer.result;
            console.log(question, answer);
        }
        setQuestions(questionsData);
    }, [props.questions, props.answer]);

    let isAnswerChecked = (question, answer) => {
        return question.userAnswers.includes(answer.answerId);
    }

    return (
        <div className="question-grades">
            {questions.map((question) => {
                console.log("q", question);
                return <div className="question-grade" key={question.questionId}>
                    <div className="grade-points">
                        <TextField id="outlined" type="number" label="Punkty" variant="outlined" value={question.result ?? ""} size="small"/>
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
                        {question.type !== 3 ? 
                        question.answers.map((answer) => (
                            <div className="question-grade-answer" key={answer.answerId}>
                                {question.type === 2 ?
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