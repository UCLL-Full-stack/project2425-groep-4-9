import { Role } from '../types';

export class User {
    private id?: number;
    private name: string;
    private password: string;
    private role: Role;

    constructor(user: { id?: number; name: string; password: string; role: Role }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.role = user.role;
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

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
}
