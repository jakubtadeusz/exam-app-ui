

class ExamService{
    _exams = [
        {
            id: 1,
            name: "Analiza matematyczna 2  - wykład",
            created: new Date("2021-04-01"),
            examTime: new Date("2021-06-15T15:00:00"),
            examDuration: 90,
            status: "Nierozpoczęty",
        },
        {
            id: 2,
            name: "Analiza matematyczna 2  - wykład",
            created: new Date("2021-04-01"),
            examTime: new Date("2021-06-15T15:00:00"),
            examDuration: 90,
            status: "W trakcie",
        },
        {
            id: 4,
            name: "Analiza matematyczna 2  - wykład",
            created: new Date("2021-04-01"),
            examTime: new Date("2021-06-15T15:00:00"),
            examDuration: 90,
            status: "Zakończony",
        },
        {
            id: 3,
            name: "Analiza matematyczna 2  - wykład",
            created: new Date("2021-04-01"),
            examTime: new Date("2021-06-15T15:00:00"),
            examDuration: 90,
            status: "Do oceny",
        },
    ];

    getExams = () =>{
        return new Promise((resolve, reject) => {
            resolve(this._exams);
        });
    } 
    
    getExam = (id) => {
        return new Promise((resolve, reject) => {
            resolve(this._exams.find((exam) => exam.id === id));
        });
    }

    addExam = (exam) => {
        return new Promise((resolve, reject) => {
            this._exams.push(exam);
            exam.id = this._exams.length;
            resolve(exam);
        });
    }

    editExam = (exam) => {
        return new Promise((resolve, reject) => {
            let index = this._exams.findIndex((e) => e.id === exam.id);
            this._exams[index] = exam;
            resolve(exam);
        });
    }

    removeExam = (id) => {
        return new Promise((resolve, reject) => {
            let index = this._exams.findIndex((e) => e.id === id);
            this._exams.splice(index, 1);
            resolve();
        });
    }
}



export default ExamService;