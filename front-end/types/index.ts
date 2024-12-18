export type Role = 'admin' | 'user';

export type Team = {
    id?: number;
    name: string;
    points: number;
    owner: User[];
    competitionId: number;
};

export type Competition = {
    id?: number;
    name: string;
    matchesPlayed: number;
    teams: Team[];
};

export type User = {
    id?: number;
    name: string;
    password: string;
    role: Role;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};