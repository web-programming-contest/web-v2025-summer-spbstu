import type {User, Chat, Message} from '../@types';
import {APP_STORAGE_KEY} from '../const';

interface StorageSchema {
    users: User[];
    chats: Chat[];
}

function loadStorage(): StorageSchema {
    const json = localStorage.getItem(APP_STORAGE_KEY);
    if (json) {
        try {
            return JSON.parse(json) as StorageSchema;
        } catch (err) {
            console.error('Failed to parse storage JSON:', err);
        }
    }
    return {users: [], chats: []};
}

function saveStorage(data: StorageSchema): void {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
}

export const UserStorage = {
    getAll(): User[] {
        return [...loadStorage().users];
    },
    add(user: User): void {
        const storage = loadStorage();
        if (!storage.users.some(u => u.id === user.id)) {
            storage.users.push(user);
            saveStorage(storage);
        }
    },
    update(updated: User): void {
        const storage = loadStorage();
        storage.users = storage.users.map(u => u.id === updated.id ? updated : u);
        saveStorage(storage);
    },
};

export const ChatStorage = {
    getAll(): Chat[] {
        return [...loadStorage().chats];
    },
    add(chat: Chat): void {
        const storage = loadStorage();
        if (!storage.chats.some(c => c.id === chat.id)) {
            storage.chats.push(chat);
            saveStorage(storage);
        }
    },
    update(updated: Chat): void {
        const storage = loadStorage();
        storage.chats = storage.chats.map(c => c.id === updated.id ? updated : c);
        saveStorage(storage);
    },
    remove(chatId: string): void {
        const storage = loadStorage();
        storage.chats = storage.chats.filter(c => c.id !== chatId);
        saveStorage(storage);
    },

    addMessage(chatId: string, message: Message): void {
        const storage = loadStorage();
        storage.chats = storage.chats.map(c => {
            if (c.id === chatId) {
                return {...c, messages: [...c.messages, message]};
            }
            return c;
        });
        saveStorage(storage);
    },

    clearChatMessages(chatId: string): void {
        const storage = loadStorage();
        storage.chats = storage.chats.map(c =>
            c.id === chatId ? {...c, messages: []} : c
        );
        saveStorage(storage);
    }
};
