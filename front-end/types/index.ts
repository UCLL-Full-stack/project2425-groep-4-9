type Role = 'admin' | 'user';

type Team = {
    id?: number;
    name: string;
    points: number;
    owner: User[];
    competition?: Competition[];
}

type Competition = {
    id?: number;
    name: string;
    matchesPlayed: number;
    teams: Team[];
}

type User = {
    id?: number;
    name: string;
    password: string;
    role: Role;
}