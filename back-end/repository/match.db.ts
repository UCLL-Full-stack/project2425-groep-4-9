import { Match } from '../model/match';
import database from '../util/database';

const createMatch = async ({
    date,
    scoreTeam1,
    scoreTeam2,
    competition,
    team1,
    team2,
}: Match): Promise<Match> => {
    try {
        const matchPrisma = await database.match.create({
            data: {
                date,
                scoreTeam1,
                scoreTeam2,
                competition: {
                    connect: { id: competition.id },
                },
                team1: {
                    connect: { id: team1.id },
                },
                team2: {
                    connect: { id: team2.id },
                },
            },
            include: {
                competition: true,
                team1: {
                    include: { competition: true },
                },
                team2: {
                    include: { competition: true },
                },
            },
        });

        return Match.from({
            ...matchPrisma,
            competition: matchPrisma.competition,
            team1: {
                ...matchPrisma.team1,
                competition: matchPrisma.team1.competition,
            },
            team2: {
                ...matchPrisma.team2,
                competition: matchPrisma.team2.competition,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createMatch,
};
