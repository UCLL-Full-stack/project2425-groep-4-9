import { Team } from './team';
import { Competition } from './competition';

export class Match {
    private id?: number;
    private date: Date;
    private score: string;
    private team1: Team;
    private team2: Team;
    private competition: Competition;

    constructor(match: {
        id?: number;
        date: Date;
        score: string;
        team1: Team;
        team2: Team;
        competition: Competition;
    }) {
        this.id = match.id;
        this.date = match.date;
        this.score = match.score;
        this.team1 = match.team1;
        this.team2 = match.team2;
        this.competition = match.competition;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getScore(): string {
        return this.score;
    }

    getTeam1(): Team {
        return this.team1;
    }

    getTeam2(): Team {
        return this.team2;
    }

    getCompetition(): Competition {
        return this.competition;
    }

    equals(match: Match): boolean {
        return (
            this.id === match.getId() &&
            this.date.getTime() === match.getDate().getTime() &&
            this.score === match.getScore() &&
            this.team1.equals(match.getTeam1()) &&
            this.team2.equals(match.getTeam2()) &&
            this.competition.equals(match.getCompetition())
        );
    }
}
