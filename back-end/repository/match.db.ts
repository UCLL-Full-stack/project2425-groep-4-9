import { Match } from '../model/match';
import database from '../util/database';

const getAllMatches = async (): Promise<Match[]> => {
    try {
        const matchesPrisma = await database.match.findMany({
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

        const matches: Match[] = [];
        for (const match of matchesPrisma) {
            matches.push(
                Match.from({
                    ...match,
                    competition: match.competition,
                    team1: {
                        ...match.team1,
                        competition: match.team1.competition,
                    },
                    team2: {
                        ...match.team2,
                        competition: match.team2.competition,
                    },
                })
            );
        }

        return matches;
    } catch (error) {
        console.error('Error fetching matches:', error);
        throw new Error('No matches found');
    }
};

const getMatchById = async ({ id }: { id: number | undefined }): Promise<Match | null> => {
    try {
        const matchPrisma = await database.match.findUnique({
            where: { id },
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

        return matchPrisma ? Match.from(matchPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('error');
    }
};

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
    getAllMatches,
    getMatchById,
};
