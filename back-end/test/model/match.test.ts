import { Match } from '../../model/match';
import { Team } from '../../model/team';
import { Competition } from '../../model/competition';
import {
    Competition as CompetitionPrisma,
    Team as TeamPrisma,
    Match as MatchPrisma,
} from '@prisma/client';

test('given: valid values for match, when: match is created, then: match is created with those values', () => {
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const team1 = new Team({ id: 1, name: 'Team A', points: 10, userId: 1, competition });
    const team2 = new Team({ id: 2, name: 'Team B', points: 8, userId: 2, competition });
    const matchData = {
        id: 1,
        date: new Date('2023-10-10'),
        team1,
        team2,
        scoreTeam1: 2,
        scoreTeam2: 1,
        competition,
    };

    const match = new Match(matchData);

    expect(match.getId()).toEqual(matchData.id);
    expect(match.getDate()).toEqual(matchData.date);
    expect(match.getScoreTeam1()).toEqual(matchData.scoreTeam1);
    expect(match.getScore2Team2()).toEqual(matchData.scoreTeam2);
    expect(match.getTeam1()).toEqual(matchData.team1);
    expect(match.getTeam2()).toEqual(matchData.team2);
    expect(match.getCompetition()).toEqual(matchData.competition);
});

test('given: two equal matches, when: equals is called, then: it returns true', () => {
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const team1 = new Team({ id: 1, name: 'Team A', points: 10, userId: 1, competition });
    const team2 = new Team({ id: 2, name: 'Team B', points: 8, userId: 2, competition });
    const matchData = {
        id: 1,
        date: new Date('2023-10-10'),
        team1,
        team2,
        scoreTeam1: 2,
        scoreTeam2: 1,
        competition,
    };
    const match1 = new Match(matchData);
    const match2 = new Match(matchData);

    const isEqual = match1.equals(match2);

    expect(isEqual).toBe(true);
});

test('given: two different matches, when: equals is called, then: it returns false', () => {
    const competition = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const team1 = new Team({ id: 1, name: 'Team A', points: 10, userId: 1, competition });
    const team2 = new Team({ id: 2, name: 'Team B', points: 8, userId: 2, competition });
    const match1 = new Match({
        id: 1,
        date: new Date('2023-10-10'),
        team1,
        team2,
        scoreTeam1: 2,
        scoreTeam2: 1,
        competition,
    });
    const match2 = new Match({
        id: 2,
        date: new Date('2023-10-11'),
        team1,
        team2,
        scoreTeam1: 3,
        scoreTeam2: 1,
        competition,
    });

    const isEqual = match1.equals(match2);

    expect(isEqual).toBe(false);
});

test('given: valid MatchPrisma object, when: from is called, then: it creates a Match instance', () => {
    const competitionPrisma: CompetitionPrisma = { id: 1, name: 'World Cup', matchesPlayed: 3 };
    const team1Prisma: TeamPrisma & { competition: CompetitionPrisma } = {
        id: 1,
        name: 'Team A',
        points: 10,
        userId: 1,
        competitionId: competitionPrisma.id,
        competition: competitionPrisma,
    };
    const team2Prisma: TeamPrisma & { competition: CompetitionPrisma } = {
        id: 2,
        name: 'Team B',
        points: 8,
        userId: 2,
        competitionId: competitionPrisma.id,
        competition: competitionPrisma,
    };
    const matchPrisma: MatchPrisma & {
        competition: CompetitionPrisma;
        team1: TeamPrisma & { competition: CompetitionPrisma };
        team2: TeamPrisma & { competition: CompetitionPrisma };
    } = {
        id: 1,
        date: new Date('2023-10-10'),
        team1: team1Prisma,
        team2: team2Prisma,
        scoreTeam1: 2,
        scoreTeam2: 1,
        competition: competitionPrisma,
        competitionId: competitionPrisma.id,
        team1Id: team1Prisma.id,
        team2Id: team2Prisma.id,
    };

    const match = Match.from(matchPrisma);

    expect(match.getId()).toEqual(matchPrisma.id);
    expect(match.getDate()).toEqual(matchPrisma.date);
    expect(match.getScoreTeam1()).toEqual(matchPrisma.scoreTeam1);
    expect(match.getScore2Team2()).toEqual(matchPrisma.scoreTeam2);
    expect(match.getTeam1().getName()).toEqual(matchPrisma.team1.name);
    expect(match.getTeam2().getName()).toEqual(matchPrisma.team2.name);
    expect(match.getCompetition().getName()).toEqual(matchPrisma.competition.name);
});
