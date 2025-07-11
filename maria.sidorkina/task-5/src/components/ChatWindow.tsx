import type {Chat, User} from "../@types";
import React, {useEffect, useRef, useState} from "react";

interface ChatWindowProps {
    currentUser: User;
    chat: Chat;
    usersMap: Record<string, string>;
    onSendMessage: (chatId: string, msg: { chatId: string; senderId: string; text: string }) => void;
    onClearChat: (chatId: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({currentUser, chat, usersMap, onSendMessage, onClearChat,}) => {
    const [draft, setDraft] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "auto"});
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chat.messages.length]);

    return (
        <div className="chat-window">
            <div className="chat-with">
                <h3>
                    Чат с{" "}
                    <b>
                        {chat.userIds
                            .filter(id => id !== currentUser.id)
                            .map(id => usersMap[id] ?? id)
                            .join(", ")}
                    </b>
                </h3>
                <button onClick={() => onClearChat(chat.id)}>Очистить чат</button>
            </div>
            <div className="messages">
                {chat.messages.map(m => {
                    const isOwn = m.senderId === currentUser.id;
                    return (
                        <div key={m.id} className={isOwn ? "message own" : "message other"}>
                            <strong>{isOwn ? currentUser.name : usersMap[m.senderId]}</strong>
                            <span className="text">{m.text}</span>
                            <span className="time">{m.timestamp.toLocaleString()}</span>
                        </div>
                    );
                })}
                <div ref={endRef}/>
            </div>
            <div className="input-area">
                <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Введите сообщение…"
                />
                <button
                    onClick={() => {
                        if (draft.trim()) {
                            onSendMessage(chat.id, {
                                chatId: chat.id,
                                senderId: currentUser.id,
                                text: draft.trim(),
                            });
                            setDraft("");
                        }
                    }}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
