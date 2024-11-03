import { Team } from './team';

export class Competition {
    private id?: number;
    private name: string;
    private matchesPlayed: number;
    private teams: Team[];

    constructor(competition: { id?: number; name: string; matchesPlayed: number; teams: Team[] }) {
        this.id = competition.id;
        this.name = competition.name;
        this.matchesPlayed = competition.matchesPlayed;
        this.teams = competition.teams;
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

    getTeams(): Team[] {
        return this.teams;
    }

    public addTeam(team: Team): void {
        this.teams.push(team);
    }

    equals(competition: Competition): boolean {
        return (
            this.id === competition.getId() &&
            this.name === competition.getName() &&
            this.matchesPlayed === competition.getMatchesPlayed() &&
            this.teams.every((team, index) => team.equals(competition.getTeams()[index]))
        );
    }
}
