import type {Message} from "./message";

export interface Chat {
    id: string;
    userIds: string[];
    messages: Message[];
}
