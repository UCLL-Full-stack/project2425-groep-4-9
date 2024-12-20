import { Competition } from '@types';

const getAllCompetitions = async () => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch competitions');
    }
    return response.json();
};

const getCompetitionById = async (id: number) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch competition with ID: ${id}`);
    }
    return response.json();
};
const getCompetitionByName = async (name: string) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/name/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Competition with name "${name}" not found.`);
        }
        throw new Error('Failed to fetch competition by name');
    }
    return response.json();
};

const createCompetition = async (competition: Competition) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(competition),
    });
    if (!response.ok) {
        throw new Error('Failed to create competition');
    }
    return response.json();
};

const deleteCompetition = async (id: number) => {
    const token = localStorage.getItem('loggedInUser')
        ? JSON.parse(localStorage.getItem('loggedInUser')!).token
        : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete competition with ID: ${id}`);
    }
    return response.json();
};

const CompetitionService = {
    getAllCompetitions,
    getCompetitionById,
    getCompetitionByName,
    createCompetition,
    deleteCompetition,
};

export default CompetitionService;
