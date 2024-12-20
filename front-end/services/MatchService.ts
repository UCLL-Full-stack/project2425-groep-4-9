import { CreateMatch, Match } from '@types';

const getAllMatches = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch matches');
    }
    return response.json();
};

const getMatchById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch match with ID: ${id}`);
    }
    return response.json();
};

const createMatch = async (match: CreateMatch) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(match),
    });

    if (!response.ok) {
        throw new Error(`Failed to create match: ${response.statusText}`);
    }
    return response.json();
};

const MatchService = {
    getAllMatches,
    getMatchById,
    createMatch,
};

export default MatchService;
