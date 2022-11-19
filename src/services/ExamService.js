import axios from 'axios';

class ExamService{
    

    examApi = 'http://localhost:5188/api/Exams';

    getExams = (token) =>{
        return new Promise((resolve, reject) => {
            axios.get(this.examApi, 
                {
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                }).then((response) => {
                console.log(response.data);
                resolve(response.data);
            });
        });
    } 
    
    getExam = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(this.examApi + "/" + id).then((response) => {
                resolve(response.data);
            });
        });
    }

    addExam = (token, exam) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.examApi,
                data: exam,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    editExam = (token, exam) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: this.examApi + "/" + exam.id,
                data: exam,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    removeExam = (token, id) => {
        return new Promise((resolve, reject) => {
            axios.delete(this.examApi + "/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + token,
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    beginExam = (token, id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.examApi + "/start/" + id,
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



export default ExamService;