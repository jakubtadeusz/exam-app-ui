import axios from "axios";

class MessageService {

    messageApi = 'http://localhost:5188/api/Messages';

    addMessage = (token, message) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.messageApi,
                data: message,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    getMessages = (token) => {
        return new Promise((resolve, reject) => {
            axios.get(this.messageApi, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    updateMessage = (token, message) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: this.messageApi,
                data: message,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    removeMessage = (token, messageId) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: this.messageApi + "/" + messageId,
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                resolve(response.data);
            });
        });
    }

    sendGrades = (token, messageId, examId, group) =>{
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.messageApi + '/' + messageId + "/SendGrades/" + examId + "/" + group,
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                resolve(response.data);
            }
            ).catch((error) => {
                reject(error);
            });
        });
    }

    sendInvitations = (token, messageId, examId, group) =>{
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: this.messageApi + "/" + messageId + "/SendInvitations/" + examId + "/" + group,
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                resolve(response.data);
            }
            ).catch((error) => {
                reject(error);
            });
        });
    }
}

export default MessageService;