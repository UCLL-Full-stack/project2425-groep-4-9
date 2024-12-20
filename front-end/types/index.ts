export type Role = 'admin' | 'owner' | 'player';

export type User = {
    id: number;
    name: string;
    password: string;
    role: string;
    team?: Team;
};
export type Team = {
    id: number;
    name: string;
    points: number;
    userId?: number;
    user: User;
    competitionId: number;
    competition: Competition;
    matchesAsTeam1: Match[];
    matchesAsTeam2: Match[];
};
export type Competition = {
    id: number;
    name: string;
    matchesPlayed: number;
    teams: Team[];
    matches: Match[];
};
export type Match = {
    id: number;
    date: string;
    scoreTeam1: number;
    scoreTeam2: number;
    competitionId: number;
    competition: Competition;
    team1Id: number;
    team1: Team;
    team2Id: number;
    team2: Team;
};

export type CreateMatch = {
    date: string;
    scoreTeam1: number;
    scoreTeam2: number;
    competition: {
        id: number;
    };
    team1: {
        id: number;
    };
    team2: {
        id: number;
    };
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};

export type authUser = {
    name: string;
    password: string;
};

export type createUser = {
    name: string;
    password: string;
    role: Role;
};
