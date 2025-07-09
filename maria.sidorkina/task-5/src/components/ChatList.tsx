import type {Chat, User} from "../@types";
import React from "react";

interface ChatListProps {
    currentUser: User;
    chats: Chat[];
    usersMap: Record<string, string>;
    onSelectChat: (chat: Chat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({currentUser, chats, usersMap, onSelectChat}) => (
    <div className="chat-list">
        <h3>Ваши чаты</h3>
        <ul>
            {chats.map(chat => {
                const peerId = chat.userIds.find(id => id !== currentUser.id)!;
                return (
                    <li key={chat.id} onClick={() => onSelectChat(chat)}>
                        {usersMap[peerId] ?? peerId}
                    </li>
                );
            })}
        </ul>
    </div>
);
