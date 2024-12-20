import { Team } from '../model/team';

type Role = 'admin' | 'owner' | 'player';

type UserInput = {
    id?: number;
    name: string;
    password: string;
    role: Role;
    team?: Team;
    teamId?: number;
};

type TeamInput = {
    id?: number;
    name: string;
    points: number;
    userId: number;
    competition: CompetitionInput;
    competitionId: number;
};

type TeamUpdate = {
    id?: number;
    name: string;
    points: number;
    userId: number;
    competitionId: number;
};

type CompetitionInput = {
    id?: number;
    name: string;
    matchesPlayed: number;
};

type MatchInput = {
    id?: number;
    date: Date;
    score: string;
    team1: TeamInput;
    team2: TeamInput;
    scoreTeam1: number;
    scoreTeam2: number;
    competition: CompetitionInput;
};

type AuthenticationResponse = {
    token: string;
    name: string;
};

export {
    Role,
    UserInput,
    TeamInput,
    CompetitionInput,
    MatchInput,
    AuthenticationResponse,
    TeamUpdate,
};
