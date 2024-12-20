import database from '../util/database';
import { Competition } from '../model/competition';

const getAllCompetitions = async (): Promise<Competition[]> => {
    try {
        const competitionPrisma = await database.competition.findMany({});
        return competitionPrisma.map((competitionPrisma) => Competition.from(competitionPrisma));
    } catch (error) {
        console.error('Error fetching competitions:', error);
        throw new Error('no teams');
    }
};

const createCompetition = async ({ name, matchesPlayed }: Competition): Promise<Competition> => {
    try {
        const competitionPrisma = await database.competition.create({
            data: {
                name,
                matchesPlayed,
            },
        });
        return Competition.from(competitionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server logs');
    }
};

const getCompetitionByName = async ({ name }: { name: string }): Promise<Competition | null> => {
    try {
        const competitionPrisma = await database.competition.findFirst({
            where: { name },
        });
        return competitionPrisma ? Competition.from(competitionPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCompetitionById = async ({ id }: { id: number }): Promise<Competition | null> => {
    try {
        const competitionPrisma = await database.competition.findUnique({
            where: { id },
        });
        return competitionPrisma ? Competition.from(competitionPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server logs');
    }
};

const deleteCompetition = async ({ id }: { id: number }): Promise<Competition> => {
    try {
        await database.match.deleteMany({
            where: {
                OR: [{ team1: { competitionId: id } }, { team2: { competitionId: id } }],
            },
        });
        await database.team.deleteMany({
            where: { competitionId: id },
        });
        const deletedCompetition = await database.competition.delete({
            where: { id },
        });

        return Competition.from(deletedCompetition);
    } catch (error) {
        console.error('Error deleting competition:', error);
        throw new Error('Database error, see server logs');
    }
};

export default {
    getAllCompetitions,
    createCompetition,
    getCompetitionById,
    getCompetitionByName,
    deleteCompetition,
};
