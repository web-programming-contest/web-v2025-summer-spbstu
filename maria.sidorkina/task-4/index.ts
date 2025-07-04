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

const STORAGE_KEY = 'events_data';

interface StoredEvent {
    id: number;
    title: string;
    date: string;
    participants: string[];
}

function saveEvents(events: MyEvent[]): void {
    const toStore: StoredEvent[] = events.map(ev => ({
        id: ev.id,
        title: ev.title,
        date: ev.date.toISOString(),
        participants: ev.participants
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
}

function loadEvents(): MyEvent[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed: StoredEvent[] = JSON.parse(data);
    return parsed.map(obj => {
        const ev = new MyEvent(obj.title, obj.date);
        ev.id = obj.id;
        ev.participants = obj.participants;
        return ev;
    });
}

let events: MyEvent[] = loadEvents();


function createEvent(title: string, date: string): Promise<MyEvent> {
    return new Promise(resolve => {
        setTimeout(() => {
            const ev = new MyEvent(title, date);
            events.push(ev);
            saveEvents(events);
            resolve(ev);
        }, 200);
    });
}

function deleteEvent(id: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            events = events.filter(ev => ev.id !== id);
            saveEvents(events);
            resolve();
        }, 200);
    });
}

function groupByDate(): Record<string, MyEvent[]> {
    return events.reduce((acc: Record<string, MyEvent[]>, ev) => {
        const key = ev.date.toISOString().split('T')[0];
        (acc[key] = acc[key] || []).push(ev);
        return acc;
    }, {});
}

function groupByParticipantCount():Map<number, MyEvent[]> {
    let result = new Map<number, MyEvent[]>();
    events.forEach(ev => {
        const count = ev.participantCount;
        if (!result.has(count)) {
            result.set(count, []);
        }
        result.get(count)!.push(ev);
    });
    return result;
}

function uniqueParticipants(): string[] {
    return Array.from(new Set(events.flatMap(ev => ev.participants)));
}

function groupByCount(): Record<number, MyEvent[]> {
    return events.reduce((acc: Record<number, MyEvent[]>, ev) => {
        const key = ev.participantCount;
        (acc[key] = acc[key] || []).push(ev);
        return acc;
    }, {});
}

function eventsWithPerson(name: string): MyEvent[] {
    return events.filter(ev => ev.participants.includes(name));
}

function eventsInMonth(month: number): MyEvent[] {
    return events.filter(ev => (ev.date.getMonth() + 1) === month);
}

const container = document.getElementById('events-container') as HTMLDivElement;
const form = document.getElementById('create-event-form') as HTMLFormElement;
const titleInput = document.getElementById('event-title') as HTMLInputElement;
const dateInput = document.getElementById('event-date') as HTMLInputElement;

function render(): void {
    container.innerHTML = '';
    events.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const title = document.createElement('h2');
        title.textContent = ev.title;
        card.append(title);

        const info = document.createElement('div');
        info.className = 'info';
        info.textContent = `Дата: ${ev.date.toLocaleDateString()} | Участников: ${ev.participantCount}`;
        card.append(info);

        const list = document.createElement('ul');
        ev.participants.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            const btnRemove = document.createElement('button');
            btnRemove.textContent = 'Удалить участника';
            btnRemove.onclick = () => ev.removeParticipant(name).then(() => {
                saveEvents(events);
                render();
            });
            li.append(btnRemove);
            list.append(li);
        });
        card.append(list);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Имя участника';
        card.append(input);

        const btnAdd = document.createElement('button');
        btnAdd.textContent = 'Добавить участника';
        btnAdd.onclick = () => {
            if (input.value) ev.addParticipant(input.value).then(() => {
                saveEvents(events);
                render();
            });
        };
        card.append(btnAdd);

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Удалить мероприятие';
        btnDel.onclick = () => deleteEvent(ev.id).then(() => render());
        card.append(btnDel);

        container.append(card);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    createEvent(titleInput.value, dateInput.value).then(() => {
        render();
        form.reset();
    });
});

document.addEventListener('DOMContentLoaded', render);
