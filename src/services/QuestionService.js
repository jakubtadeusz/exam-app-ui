import axios from "axios";

    let questionApi = "http://localhost:5188/api/Questions";
    let answerApi = "http://localhost:5188/api/Answers";

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

    addQuestion = (token, question) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: questionApi,
                data: question,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    saveQuestions = (token, questions) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: questionApi,
                data: questions,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    addQuestionAnswer = (token, answer) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: answerApi,
                data: answer,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    deleteQuestion = (token, question) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: questionApi + "/" + question.id,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }
}

export default QuestionService;