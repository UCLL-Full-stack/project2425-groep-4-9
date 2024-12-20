import { Match } from '../model/match';
import matchDb from '../repository/match.db';

const getAllMatches = async (): Promise<Match[]> => {
    const matches = await matchDb.getAllMatches();
    return matches;
};

const getMatchById = async (id: number): Promise<Match> => {
    const match = await matchDb.getMatchById({ id });
    if (!match) throw new Error(`Competition with id ${id} does not exist.`);
    return match;
};

const createMatch = async ({
    date,
    scoreTeam1,
    scoreTeam2,
    competition,
    team1,
    team2,
}: Match): Promise<Match> => {
    if (!competition) {
        throw new Error(`nothing`);
    }

    if (!team1.id) {
        throw new Error(`nothing`);
    }

    if (!team2.id) {
        throw new Error(`nothing`);
    }

    const match = new Match({
        date,
        scoreTeam1,
        scoreTeam2,
        competition,
        team1,
        team2,
    });
    return await matchDb.createMatch(match);
};

export default { createMatch, getAllMatches, getMatchById };
