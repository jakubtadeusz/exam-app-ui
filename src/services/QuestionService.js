import axios from "axios";

    let questionApi = "http://localhost:5188/api/Questions";
    let answerApi = "http://localhost:5188/api/Answers";

    let _questions = [
        {
            examId: 1,
            questionId: 1,
            question: "Pytanie 1 - jednokrotnego wyboru",
            type: 1,
            points: 1,
            answers: [
                {
                    answerId: 1,
                    answer: "Odpowiedź 1",
                    correct: true
                },
                {
                    answerId: 2,
                    answer: "Odpowiedź 2",
                    correct: false
                },
                {
                    answerId: 3,
                    answer: "Odpowiedź 3",
                    correct: false
                },
                {
                    answerId: 4,
                    answer: "Odpowiedź 4",
                    correct: false
                },
            ]
        },
        {
            examId: 1,
            questionId: 2,
            question: "Pytanie 2 - wielokrotnego wyboru",
            type: 2,
            points: 3,
            answers: [
                {
                    answerId: 1,
                    answer: "Odpowiedź 1",
                    correct: true
                },
                {
                    answerId: 2,
                    answer: "Odpowiedź 2",
                    correct: true
                },
                {
                    answerId: 3,
                    answer: "Odpowiedź 3",
                    correct: false
                },
                {
                    answerId: 4,
                    answer: "Odpowiedź 4",
                    correct: false
                },
            ]
        },
        {
            examId: 1,
            questionId: 3,
            question: "Pytanie 3 - otwarte",
            type: 3,
            points: 7,
        }
    ];

class QuestionService {

    getQuestions = (examId) => {
        return new Promise((resolve, reject) => {
            axios.get(questionApi + "?examId=" + examId)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            axios.post(questionApi, question)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    saveQuestions = (questions) => {
        return new Promise((resolve, reject) => {
            axios.put(questionApi, questions)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    addQuestionAnswer = (answer) => {
        return new Promise((resolve, reject) => {
            axios.post(answerApi, answer)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    deleteQuestion = (question) => {
        return new Promise((resolve, reject) => {
            axios.delete(questionApi + "/" + question.id)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default QuestionService;