import type {User} from "../@types";
import {UserStorage} from "../storage";
import React, {useState} from "react";

interface RegistrationProps {
    onRegister: (user: User) => void;
}

export const Registration: React.FC<RegistrationProps> = ({onRegister}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const exists = UserStorage.getAll().find(u => u.name.toLowerCase() === trimmed.toLowerCase());
        if (exists) {
            onRegister(exists);
        } else {
            const newUser: User = {
                id: crypto.randomUUID(),
                name: trimmed
            };
            UserStorage.add(newUser);
            onRegister(newUser);
        }
    };

    return (
        <div className="registration">
            <h2>Введите имя пользователя</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    placeholder="Ваше имя"
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};
