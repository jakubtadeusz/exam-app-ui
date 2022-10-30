class MessageService {

    constructor() {

        this.messages = [{
                id: 1,
                name: "Wiadomość zaproszenie AM1",
                content: "Dzień dobry,\nEgzamin z przedmiotu Analiza Matematyczna 1 odbędzie się dnia 15.05.2022.\nLink do egzaminu: {link}\n\nPozdrawiam\nJan Kowalski",
                type: "Zaproszenie"
            },
            {
                id: 2,
                name: "Wiadomość ocena AM1",
                content: "Dzień dobry, Pani/Panie {imie} {nazwisko}\nOtrzymany wynik egzaminu z przedmiotu Analiza Matematyczna 1 to: {pkt}/{pkt_max}\n\nPozdrawiam\nJan Kowalski",
                type: "Ocena"
            },
            {
                id: 3,
                name: "Wiadomość zaproszenie AM2",
                content: "Dzień dobry,\nEgzamin z przedmiotu Analiza Matematyczna 2 odbędzie się dnia 15.05.2022.\nLink do egzaminu: {link}\n\nPozdrawiam\nJan Kowalski",
                type: "Zaproszenie"
            },
            {
                id: 4,
                name: "Wiadomość ocena AM2",
                content: "Dzień dobry, Pani/Panie {imie} {nazwisko}\nOtrzymany wynik egzaminu z przedmiotu Analiza Matematyczna 2 to: {pkt}/{pkt_max}\n\nPozdrawiam\nJan Kowalski",
                type: "Ocena"
            },
        ];

    }

    addMessage = (message) => {
        return new Promise((resolve, reject) => {
            this.messages.push(message);
            resolve(message);
        });
    }

    getMessages = () => {
        return new Promise((resolve, reject) => {
            resolve(this.messages);
        });
    }

    updateMessage = (message) => {
        return new Promise((resolve, reject) => {
            const index = this.messages.findIndex((m) => m.id === message.id);
            this.messages[index] = message;
            resolve(message);
        });
    }

    removeMessage = (messageId) => {
        return new Promise((resolve, reject) => {
            const index = this.messages.findIndex((m) => m.id === messageId);
            this.messages.splice(index, 1);
            resolve();
        });
    }
}

export default MessageService;