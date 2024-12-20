import { Team } from '../../model/team'; // Adjust the path as needed
import { Competition } from '../../model/competition';
import { Team as TeamPrisma, Competition as CompetitionPrisma } from '@prisma/client';

test('given: valid values for team, when: team is created, then: team is created with those values', () => {
    // given
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const teamData = {
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 101,
        competition,
    };

    // when
    const team = new Team(teamData);

    // then
    expect(team.getId()).toEqual(teamData.id);
    expect(team.getName()).toEqual(teamData.name);
    expect(team.getPoints()).toEqual(teamData.points);
    expect(team.getuserId()).toEqual(teamData.userId);
    expect(team.competition).toEqual(teamData.competition);
});

test('given: two equal teams, when: equals is called, then: it returns true', () => {
    // given
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const teamData = {
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 101,
        competition,
    };
    const team1 = new Team(teamData);
    const team2 = new Team(teamData);

    // when
    const isEqual = team1.equals(team2);

    // then
    expect(isEqual).toBe(true);
});

test('given: two different teams, when: equals is called, then: it returns false', () => {
    // given
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const team1 = new Team({
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 101,
        competition,
    });
    const team2 = new Team({
        id: 2,
        name: 'Team B',
        points: 15,
        userId: 102,
        competition,
    });

    // when
    const isEqual = team1.equals(team2);

    // then
    expect(isEqual).toBe(false);
});

test('given: valid TeamPrisma object, when: from is called, then: it creates a Team instance', () => {
    // given
    const competitionPrisma: CompetitionPrisma = { id: 1, name: 'World Cup', matchesPlayed: 3 };
    const teamPrisma: TeamPrisma & { competition: CompetitionPrisma } = {
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 101,
        competitionId: competitionPrisma.id,
        competition: competitionPrisma,
    };

    // when
    const team = Team.from(teamPrisma);

    // then
    expect(team.getId()).toEqual(teamPrisma.id);
    expect(team.getName()).toEqual(teamPrisma.name);
    expect(team.getPoints()).toEqual(teamPrisma.points);
    expect(team.getuserId()).toEqual(teamPrisma.userId);
    expect(team.competition.getName()).toEqual(teamPrisma.competition.name);
});