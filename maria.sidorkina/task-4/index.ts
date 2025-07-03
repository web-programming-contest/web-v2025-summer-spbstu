interface SomeEvent {
    id: number;
    title: string;
    date: Date;
    participants: string[];

    addParticipant(name: string): Promise<void>;

    removeParticipant(name: string): Promise<void>;

    get participantCount(): number;
}

class MyEvent implements SomeEvent {
    id: number;
    title: string;
    date: Date;
    participants: string[];

    constructor(title: string, date: string) {
        this.id = MyEvent.generateId();
        this.title = title;
        this.date = new Date(date);
        this.participants = [];
    }

    static generateId(): number {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    addParticipant(name: string): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                if (!this.participants.includes(name)) {
                    this.participants.push(name);
                }
                resolve();
            }, 200);
        });
    }

    removeParticipant(name: string): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.participants = this.participants.filter(n => n !== name);
                resolve();
            }, 200);
        });
    }

    get participantCount(): number {
        return this.participants.length;
    }
}
