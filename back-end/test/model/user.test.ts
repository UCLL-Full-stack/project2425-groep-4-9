import { User } from '../../model/user';
import { Team } from '../../model/team';
import { Competition } from '../../model/competition';
import {
    User as UserPrisma,
    Team as TeamPrisma,
    Competition as CompetitionPrisma,
} from '@prisma/client';
import { Role } from '../../types';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const competition = new Competition({ id: 1, name: 'Championship', matchesPlayed: 3 });
    const team = new Team({ id: 1, name: 'Team A', points: 10, userId: 101, competition });
    const userData = {
        id: 1,
        name: 'Senne',
        password: 'huts123',
        role: 'admin' as Role,
        team,
    };

    const user = new User(userData);

    expect(user.getId()).toEqual(userData.id);
    expect(user.getName()).toEqual(userData.name);
    expect(user.getPassword()).toEqual(userData.password);
    expect(user.getRole()).toEqual(userData.role);
    expect(user.getTeam()).toEqual(userData.team);
});

test('given: two equal users, when: equals is called, then: it returns true', () => {
    const competition = new Competition({ id: 1, name: 'Championship', matchesPlayed: 3 });
    const team = new Team({ id: 1, name: 'Team A', points: 10, userId: 101, competition });
    const user1 = new User({
        id: 1,
        name: 'Senne',
        password: 'huts123',
        role: 'admin' as Role,
        team,
    });
    const user2 = new User({
        id: 1,
        name: 'Senne',
        password: 'huts123',
        role: 'admin' as Role,
        team,
    });

    const isEqual = user1.equals(user2);

    expect(isEqual).toBe(true);
});

test('given: two different users, when: equals is called, then: it returns false', () => {
    const competition = new Competition({ id: 1, name: 'Championship', matchesPlayed: 3 });
    const team = new Team({ id: 1, name: 'Team A', points: 10, userId: 101, competition });
    const user1 = new User({
        id: 1,
        name: 'Senne',
        password: 'huts123',
        role: 'admin' as Role,
        team,
    });
    const user2 = new User({
        id: 2,
        name: 'JaneDoe',
        password: 'anotherpassword456',
        role: 'user' as Role,
        team: null,
    });

    const isEqual = user1.equals(user2);

    expect(isEqual).toBe(false);
});

test('given: valid UserPrisma object, when: from is called, then: it creates a User instance', () => {
    const competitionPrisma: CompetitionPrisma = { id: 1, name: 'Championship', matchesPlayed: 3 };
    const teamPrisma: TeamPrisma & { competition: CompetitionPrisma } = {
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 101,
        competitionId: competitionPrisma.id,
        competition: competitionPrisma,
    };
    const userPrisma: UserPrisma & {
        team: (TeamPrisma & { competition: CompetitionPrisma }) | null;
    } = {
        id: 1,
        name: 'Senne',
        password: 'huts123',
        role: 'admin' as Role,
        team: teamPrisma,
    };

    const user = User.from(userPrisma);

    expect(user.getId()).toEqual(userPrisma.id);
    expect(user.getName()).toEqual(userPrisma.name);
    expect(user.getPassword()).toEqual(userPrisma.password);
    expect(user.getRole()).toEqual(userPrisma.role);
    expect(user.getTeam()?.getName()).toEqual(userPrisma.team?.name);
});
