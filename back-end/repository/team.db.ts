import { Team } from '../model/team';
import { User } from '../model/user';
import { competitions } from './competition.db';

const [amateurLeague] = competitions;

const teams = [
    new Team({
        id: 1,
        name: 'sk diamant',
        points: 0,
        owner: new User({ id: 1, name: 'Jente', password: 'jente', role: 'admin' }),
        competitionId: amateurLeague.getId()!,
    }),
    new Team({
        id: 2,
        name: 'fc heist goor',
        points: 0,
        owner: new User({ id: 2, name: 'Tyas', password: 'tyas', role: 'admin' }),
        competitionId: amateurLeague.getId()!,
    }),
    new Team({
        id: 3,
        name: 'Real sas',
        points: 0,
        owner: new User({ id: 3, name: 'Fons', password: 'sas', role: 'admin' }),
        competitionId: amateurLeague.getId()!,
    }),
];

teams.forEach((team) => amateurLeague.addTeam(team));

const getAllTeams = (): Team[] => {
    return teams;
};

const getTeamById = (id: number): Team | undefined => {
    try {
        return teams.find((team) => team.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while getting a team by id');
    }
};

const getTeamsByCompetition = (competitionId: number): Team[] => {
    return teams.filter((team) => team.getCompetitionId() === competitionId);
};

export default { getAllTeams, getTeamById, getTeamsByCompetition };
