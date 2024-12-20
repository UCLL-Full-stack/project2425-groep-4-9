import { Team } from '@types';

const getAllTeams = async () => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch teams');
    }
    return response.json();
};

const getTeamById = async (id: number) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch team with ID: ${id}`);
    }
    return response.json();
};

const getTeamsByCompetition = async (competitionId: number) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/teams/competition/${competitionId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch teams for competition ID: ${competitionId}`);
    }
    return response.json();
};

const createTeam = async (team: Team) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(team),
    });

    if (!response.ok) {
        throw new Error(`Failed to create team: ${response.statusText}`);
    }
    return response.json();
};

const deleteTeam = async (id: number) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete team with ID: ${id}`);
    }
    return response.json();
};

const updateTeam = async (id: number, updates: Partial<Team>) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error(`Failed to update team with ID: ${id}`);
    }
    return response;
};

const TeamService = {
    getAllTeams,
    createTeam,
    getTeamById,
    getTeamsByCompetition,
    deleteTeam,
    updateTeam,
};

export default TeamService;
