import { Team } from '../model/team';
import teamDb from '../repository/team.db';
import { Competition } from '../model/competition';
import database from '../util/database';
import userDb from '../repository/user.db';
import { User } from '../model/user';

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

export default {
    createTeam,
    getAllTeams,
};
