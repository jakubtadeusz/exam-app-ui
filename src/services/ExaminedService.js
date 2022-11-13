import axios from "axios";

class ExaminedService {
    examinedApi = "http://localhost:5188/api/Examined";

    addExamined = (token, examined) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.examinedApi,
                data: examined,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    updateExamined = (token, examined) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: this.examinedApi + "/" + examined.id,
                data: examined,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }
    
    getExamined(token) {
        return new Promise((resolve, reject) => {
            axios.get(this.examinedApi, {
                headers: {
                    "Authorization": "Bearer " + token,
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    removeExamined = (token, examinedId) => {
        return new Promise((resolve, reject) => {
            axios.delete(this.examinedApi + "/" + examinedId, 
            {
                headers: {
                    "Authorization": "Bearer " + token,
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }
    
}

export default ExaminedService;