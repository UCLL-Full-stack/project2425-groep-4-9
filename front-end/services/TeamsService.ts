const getAllTeams = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const fetchTeamsByCompetition = async (competitionId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/competition/${competitionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const TeamService = {
    getAllTeams,
    fetchTeamsByCompetition,
};

export default TeamService;
