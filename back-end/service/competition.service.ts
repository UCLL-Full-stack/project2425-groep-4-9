import { Competition } from '../model/competition';
import competitionDb from '../repository/competition.db';

const getAllCompetitions = (): Competition[] => {
    return competitionDb.getAllCompetitions();
};

export default { getAllCompetitions };
