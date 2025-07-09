import type {User} from "../@types";
import React from "react";

interface UserListProps {
    currentUser: User;
    users: User[];
    onSelectUser: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({currentUser, users, onSelectUser}) => (
    <div className="user-list">
        <h3>Найти собеседника</h3>
        <ul>
            {users
                .filter(u => u.id !== currentUser.id)
                .map(u => (
                    <li key={u.id} onClick={() => onSelectUser(u)}>
                        {u.name}
                    </li>
                ))}
        </ul>
    </div>
);
