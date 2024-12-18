import database from '../util/database';
import { Team } from '../model/team';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
                competition: true,
                user: true,
            },
        });
        console.log(teamsPrisma);
        return teamsPrisma.map((teamsPrisma) => Team.from(teamsPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('no teams');
    }
};

const createTeam = async ({
    name,
    userId,
    competitionId,
}: {
    name: string;
    userId: number;
    competitionId: number;
}): Promise<Team> => {
    try {
        const teamPrisma = await database.team.create({
            data: {
                name,
                points: 0,
                user: {
                    connect: { id: userId },
                },
                competition: {
                    connect: { id: competitionId },
                },
            },
            include: {
                competition: true,
                user: true,
            },
        });

        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTeamById = async ({ id }: { id: number | undefined }): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findUnique({
            where: { id },
            include: {
                competition: true,
            },
        });

        return teamPrisma ? Team.from(teamPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('error');
    }
};

export default {
    createTeam,
    getTeamById,
    getAllTeams,
};
