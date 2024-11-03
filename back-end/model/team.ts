import { User } from './user';
import { Competition } from './competition';

export class Team {
    private id: number;
    private name: string;
    private points: number;
    private owner: User;
    private competitionId: number;

    constructor({
        id,
        name,
        points,
        owner,
        competitionId,
    }: {
        id: number;
        name: string;
        points: number;
        owner: User;
        competitionId: number;
    }) {
        this.id = id;
        this.name = name;
        this.points = points;
        this.owner = owner;
        this.competitionId = competitionId;
    }

    public getCompetitionId(): number {
        return this.competitionId;
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

    getOwner(): User {
        return this.owner;
    }

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints() &&
            this.owner.equals(team.getOwner()) &&
            this.competitionId === team.getCompetitionId()
        );
    }
}
