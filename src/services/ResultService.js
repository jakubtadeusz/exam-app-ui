import axios from "axios";

    let resultApi = "http://localhost:5188/api/Results";

class ResultService {

    getResults = (token, examId) => {
        return new Promise((resolve, reject) => {
            axios.get(resultApi + "?examId=" + examId, {
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    addResults = (results) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: resultApi,
                data: results
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    saveGrades = (token, results) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: resultApi + "/Grade",
                data: results,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    finishGrading = (token, examId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: resultApi + "/grade/finish/" + examId,
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

export default ResultService;