import { Team } from '../model/team';
import teamDb from '../repository/team.db';
import database from '../util/database';

const getAllTeams = async (): Promise<Team[]> => {
    const teams = await teamDb.getAllTeams();
    return teams;
};

const createTeam = async ({
    name,
    userId,
    competitionId,
}: {
    name: string;
    userId: number | null;
    competitionId: number;
}): Promise<Team> => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const userExists = await database.user.findUnique({
        where: { id: userId },
    });

    if (!userExists) {
        throw new Error(`No User record found with ID: ${userId}`);
    }
    const competition = await database.competition.findUnique({
        where: { id: competitionId },
    });

    if (!competition) {
        throw new Error(`No Competition found with ID: ${competitionId}`);
    }

    const team = await teamDb.createTeam({
        name,
        userId,
        competitionId,
    });

    return team;
};

const deleteTeam = async ({ id }: { id: number }): Promise<void> => {
    try {
        const team = await teamDb.getTeamById({ id });
        if (!team) {
            throw new Error(`Team with id ${id} does not exist.`);
        }
        await teamDb.deleteTeam({ id });
        console.log(`Team with id ${id} has been successfully deleted.`);
    } catch (error) {
        console.error('Error deleting team:', error);
        throw new Error('Unable to delete team, please check the server logs.');
    }
};

const getTeamById = async ({ id }: { id: number }): Promise<Team | null> => {
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
        throw new Error('Database error. See server log for details.');
    }
};

const getTeamsByCompetition = async ({
    competitionId,
}: {
    competitionId: number;
}): Promise<Team[]> => {
    try {
        const teams = await teamDb.getTeamsByCompetition({ competitionId });
        return teams;
    } catch (error) {
        console.error(`Error fetching teams for competition ${competitionId}:`, error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateTeam = async ({
    id,
    name,
    points,
    userId,
    competitionId,
}: {
    id: number;
    name: string;
    points: number;
    userId: number;
    competitionId: number;
}): Promise<Team> => {
    const team = await teamDb.updateTeam({
        id,
        name,
        points,
        userId,
        competitionId,
    });

    return team;
};

export default {
    createTeam,
    getTeamById,
    getAllTeams,
    getTeamsByCompetition,
    deleteTeam,
    updateTeam,
};
