
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
        examId = 1;
        return new Promise((resolve, reject) => {
            console.log("questions list", _questions);
            resolve(_questions.filter((question) => question.examId === examId));
        });
    }

    addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            this._questions.push(question);
            console.log(_questions);
            resolve(question);
        });
    }
}

export default QuestionService;