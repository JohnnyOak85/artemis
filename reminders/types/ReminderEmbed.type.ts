export type ReminderEmbed = {
    id: string;
    done?: boolean;
    event?: string;
    image?: string;
    memberId?: string;
    timestamp: number;
    type: 'birthday' | 'celebration' | 'release';
    url?: string;
};
