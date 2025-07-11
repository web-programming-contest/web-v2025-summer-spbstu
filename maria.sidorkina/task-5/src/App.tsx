import {useEffect, useState} from "react";
import type {Chat, User, Message} from "./@types";
import {ChatStorage, UserStorage} from "./storage";
import {ChatList, ChatWindow, Registration, UserList} from "./components";
import {LAST_USER_ID_KEY} from "./const.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    useEffect(() => {
        setUsers(UserStorage.getAll());
        setChats(ChatStorage.getAll());

        const lastId = localStorage.getItem(LAST_USER_ID_KEY);
        if (lastId) {
            const u = UserStorage.getAll().find(u => u.id === lastId) || null;
            setCurrentUser(u);
        }
    }, []);

    useEffect(() => {
        if (currentUser) localStorage.setItem(LAST_USER_ID_KEY, currentUser.id);
        else localStorage.removeItem(LAST_USER_ID_KEY);
    }, [currentUser]);

    const handleRegister = (user: User) => {
        UserStorage.add(user);
        setUsers(prev => prev.some(u => u.id === user.id) ? prev : [...prev, user]);
        setCurrentUser(user);
    };

    const handleSelectUser = (peer: User) => {
        if (!currentUser) return;

        const id = [currentUser.id, peer.id].sort().join("_");
        const existing = chats.find(c => c.id === id);

        if (existing) {
            setActiveChatId(id);
        } else {
            const newChat: Chat = {
                id,
                userIds: [currentUser.id, peer.id],
                messages: []
            };
            ChatStorage.add(newChat);
            setChats(prev => [...prev, newChat]);
            setActiveChatId(id);
        }
    };

    const handleSelectChat = (chat: Chat) => {
        setActiveChatId(chat.id);
    };

    const handleSendMessage = (chatId: string, msg: Omit<Message, "id" | "timestamp"> & { text: string }) => {
        const newMsg: Message = {
            ...msg,
            id: crypto.randomUUID(),
            timestamp: new Date(),
        };
        ChatStorage.addMessage(chatId, newMsg);
        setChats(prev =>
            prev.map(c => c.id === chatId ? {...c, messages: [...c.messages, newMsg]} : c)
        );
    };

    const handleClearChat = (chatId: string) => {
        ChatStorage.clearChatMessages(chatId);
        ChatStorage.remove(chatId);
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) {
            setActiveChatId(null);
        }
    };

    const usersMap = Object.fromEntries(users.map(u => [u.id, u.name]));
    const myChats = chats.filter(c => currentUser && c.userIds.includes(currentUser.id));
    const activeChat = myChats.find(c => c.id === activeChatId!) || null;

    return (
        <div className="app-container">
            {!currentUser ? (
                <Registration onRegister={handleRegister}/>
            ) : (
                <>
                    <header className="header">
                        <span>Привет, <b>{currentUser.name}</b>!</span>
                        <button onClick={() => {
                            setCurrentUser(null);
                            setActiveChatId(null);
                        }}>Выйти
                        </button>
                    </header>
                    <div className="main-layout">
                        <UserList
                            currentUser={currentUser}
                            users={users}
                            onSelectUser={handleSelectUser}
                        />
                        <ChatList
                            currentUser={currentUser}
                            chats={myChats}
                            usersMap={usersMap}
                            onSelectChat={handleSelectChat}
                        />
                        {activeChat ? (
                            <ChatWindow
                                currentUser={currentUser}
                                chat={activeChat}
                                usersMap={usersMap}
                                onSendMessage={handleSendMessage}
                                onClearChat={handleClearChat}
                            />
                        ) : <div className="empty-chat">Start a new conversation right now!</div>
                        }
                    </div>
                </>
            )}
        </div>
    );
}
