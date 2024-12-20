import { Match } from './match';
import { Team } from './team';
import { Competition as CompetitionPrisma, Team as TeamPrisma } from '@prisma/client';

export class Competition {
    readonly id?: number;
    readonly name: string;
    readonly matchesPlayed: number;

    constructor(competition: { id?: number; name: string; matchesPlayed: number }) {
        this.id = competition.id;
        this.name = competition.name;
        this.matchesPlayed = competition.matchesPlayed;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getMatchesPlayed(): number {
        return this.matchesPlayed;
    }

    equals(competition: Competition): boolean {
        return (
            this.id === competition.getId() &&
            this.name === competition.getName() &&
            this.matchesPlayed === competition.getMatchesPlayed()
        );
    }

    static from({ id, name, matchesPlayed }: CompetitionPrisma) {
        return new Competition({
            id,
            name,
            matchesPlayed,
        });
    }
}
