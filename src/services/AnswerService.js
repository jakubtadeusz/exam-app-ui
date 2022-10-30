class AnswerService {

    constructor() {

        this.Answers = [{
            examId: 1,
            answers: [{
                    userId: 1,
                    answers: [{
                            questionId: 1,
                            answers: [1],
                            result: null
                        },
                        {
                            questionId: 2,
                            answers: [1, 2],
                            result: null
                        },
                        {
                            questionId: 3,
                            answers: ["Odpowiedź 1"],
                            result: null
                        }
                    ]
                },
                {
                    userId: 2,
                    answers: [{
                            questionId: 1,
                            answers: [2],
                            result: null
                        },
                        {
                            questionId: 2,
                            answers: [2, 3],
                            points: null
                        },
                        {
                            questionId: 3,
                            answers: ["Odpowiedź 2"],
                            result: null
                        }
                    ]
                },
                {
                    userId: 3,
                    answers: [{
                            questionId: 1,
                            answers: [3],
                            result: null
                        },
                        {
                            questionId: 2,
                            answers: [3],
                            result: null
                        },
                        {
                            questionId: 3,
                            answers: ["Odpowiedź 3"],
                            result: null
                        }
                    ]
                }
            ]
        }, ];
    }

    addAnswers = (examId, answer) => {
        return new Promise((resolve, reject) => {
            let exam = this.Answers.find(exam => exam.examId === examId);
            if (exam) {
                exam.answers.push(answer);
                resolve(answer);
            } else {
                reject("Exam not found");
            }
        });
    }

    getAnswers = (examId) => {
        examId = 1;
        console.log(examId);
        return new Promise((resolve, reject) => {
            resolve(this.Answers.find((a) => a.examId === examId).answers);
        });
    }

}

export default AnswerService;