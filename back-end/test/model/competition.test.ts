import { Competition as CompetitionPrisma } from '@prisma/client';
import { Competition } from '../../model/competition';

test('given: valid values for competition, when: competition is created, then: competition is created with those values', () => {
    const competitionData = {
        id: 1,
        name: 'World Cup',
        matchesPlayed: 3,
    };

    const competition = new Competition(competitionData);

    expect(competition.getId()).toEqual(competitionData.id);
    expect(competition.getName()).toEqual(competitionData.name);
    expect(competition.getMatchesPlayed()).toEqual(competitionData.matchesPlayed);
});

test('given: two equal competitions, when: equals is called, then: it returns true', () => {
    const competitionData = {
        id: 1,
        name: 'World Cup',
        matchesPlayed: 3,
    };
    const competition1 = new Competition(competitionData);
    const competition2 = new Competition(competitionData);

    const isEqual = competition1.equals(competition2);

    expect(isEqual).toBe(true);
});

test('given: two different competitions, when: equals is called, then: it returns false', () => {
    const competition1 = new Competition({ id: 1, name: 'World Cup', matchesPlayed: 3 });
    const competition2 = new Competition({ id: 2, name: 'Champions League', matchesPlayed: 5 });

    const isEqual = competition1.equals(competition2);

    expect(isEqual).toBe(false);
});

test('given: valid CompetitionPrisma object, when: from is called, then: it creates a Competition instance', () => {
    const competitionPrisma: CompetitionPrisma = {
        id: 1,
        name: 'World Cup',
        matchesPlayed: 3,
    };

    const competition = Competition.from(competitionPrisma);

    expect(competition.getId()).toEqual(competitionPrisma.id);
    expect(competition.getName()).toEqual(competitionPrisma.name);
    expect(competition.getMatchesPlayed()).toEqual(competitionPrisma.matchesPlayed);
});
