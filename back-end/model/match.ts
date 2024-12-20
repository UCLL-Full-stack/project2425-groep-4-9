import { Team } from './team';
import { Competition } from './competition';
import {
    Match as matchPrisma,
    Competition as CompetitionPrisma,
    Team as TeamPrisma,
} from '@prisma/client';

export class Match {
    readonly id?: number;
    readonly date: Date;

    readonly scoreTeam1: number;
    readonly scoreTeam2: number;

    readonly competition: Competition;

    readonly team1: Team;
    readonly team2: Team;

    constructor(match: {
        id?: number;
        date: Date;
        team1: Team;
        team2: Team;
        scoreTeam1: number;
        scoreTeam2: number;
        competition: Competition;
    }) {
        this.id = match.id;
        this.date = match.date;
        this.scoreTeam1 = match.scoreTeam1;
        this.scoreTeam2 = match.scoreTeam2;

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

    getScoreTeam1(): number {
        return this.scoreTeam1;
    }

    getScore2Team2(): number {
        return this.scoreTeam2;
    }

    getCompetition(): Competition {
        return this.competition;
    }

    getTeam1(): Team {
        return this.team1;
    }

    getTeam2(): Team {
        return this.team2;
    }

    equals(match: Match): boolean {
        return (
            this.id === match.getId() &&
            this.date.getTime() === match.getDate().getTime() &&
            this.scoreTeam1 === match.getScoreTeam1() &&
            this.scoreTeam2 === match.getScore2Team2() &&
            this.competition.equals(match.getCompetition())
        );
    }

    static from({
        id,
        date,
        team1,
        team2,
        scoreTeam1,
        scoreTeam2,
        competition,
    }: matchPrisma & {
        competition: CompetitionPrisma;
        team1: TeamPrisma & { competition: CompetitionPrisma };
        team2: TeamPrisma & { competition: CompetitionPrisma };
    }): Match {
        return new Match({
            id,
            date,
            team1: Team.from({ ...team1, competition: team1.competition as CompetitionPrisma }),
            team2: Team.from({ ...team2, competition: team2.competition as CompetitionPrisma }),
            scoreTeam1,
            scoreTeam2,
            competition: Competition.from(competition),
        });
    }
}
