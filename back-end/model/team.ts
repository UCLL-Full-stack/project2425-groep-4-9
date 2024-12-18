import { Team as TeamPrisma, Competition as CompetitionPrisma } from '@prisma/client';
import { Competition } from './competition';

export class Team {
    readonly id: number;
    readonly name: string;
    readonly points: number;

    readonly userId: number | null;

    readonly competition: Competition;

    constructor(team: {
        id: number;
        name: string;
        points: number;
        userId: number | null;
        competition: Competition;
    }) {
        this.id = team.id;
        this.name = team.name;
        this.points = team.points;
        this.userId = team.userId ?? null;
        this.competition = team.competition;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPoints(): number {
        return this.points;
    }

    getuserId(): number | null {
        return this.userId;
    }

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints() &&
            this.userId === team.getuserId()
        );
    }

    static from({
        id,
        name,
        points,
        userId,
        competition,
    }: TeamPrisma & { competition: CompetitionPrisma }) {
        return new Team({
            id,
            name,
            points,
            userId: userId,
            competition: Competition.from(competition),
        });
    }
}
