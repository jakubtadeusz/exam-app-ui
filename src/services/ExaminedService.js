
class ExaminedService {
    
    constructor() {
        this.examined = [
            {
                id: 1,
                name: "Jan",
                surname: "Kowalski",
                email: "jkow@mail.com",
                group: "ITE2019"
            },
            {
                id: 2,
                name: "Anna",
                surname: "Nowak",
                email: "anowak@mail.com",
                group: "ITE2019"
            },
            {
                id: 3,
                name: "Krzysztof",
                surname: "Strzelecki",
                email: "kstrzel@mail.com",
                group: "ITE2019"
            },
        ];
    }
    
    addExamined = (examined) => {
        return new Promise((resolve, reject) => {
            this.examined.push(examined);
            resolve(examined);
        });
    }
    
    getExamined() {
        return new Promise((resolve, reject) => {
            resolve(this.examined);
        });
    }

    removeExamined = (examinedId) => {
        return new Promise((resolve, reject) => {
            const index = this.examined.findIndex((e) => e.id === examinedId);
            this.examined.splice(index, 1);
            resolve();
        });
    }
    
}

export default ExaminedService;