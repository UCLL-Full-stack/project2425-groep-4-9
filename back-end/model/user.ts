import {
    User as UserPrisma,
    Team as TeamPrisma,
    Competition as CompetitionPrisma,
} from '@prisma/client';

import { Role } from '../types';
import { Team } from './team';

export class User {
    readonly id?: number;
    readonly name: string;
    readonly password: string;
    readonly role: Role;
    readonly team: Team | null;

    constructor(user: {
        id?: number;
        name: string;
        password: string;
        role: Role;
        team: Team | null;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.role = user.role;
        this.team = user.team;
    }
    validate(user: { name: string; password: string; role: Role; team: Team | null }): void {
        if (!user.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    getTeam(): Team | null {
        return this.team;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.team === user.getTeam()
        );
    }

    static from({
        id,
        name,
        password,
        role,
        team,
    }: UserPrisma & { team: (TeamPrisma & { competition: CompetitionPrisma }) | null }) {
        return new User({
            id,
            name,
            password,
            role: role as Role,
            team: team
                ? Team.from({ ...team, competition: team.competition as CompetitionPrisma })
                : null,
        });
    }
}
