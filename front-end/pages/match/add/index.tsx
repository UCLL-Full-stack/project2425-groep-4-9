import React, { useState, useEffect } from 'react';
import { Match, Competition, Team } from '../../../types';
import MatchService from '../../../services/MatchService';
import CompetitionService from '../../../services/CompetitionService';
import TeamService from '../../../services/TeamsService';
import Header from '@components/header';

const AddMatchPage = () => {
    const [newMatchDate, setNewMatchDate] = useState<string>('');
    const [newScoreTeam1, setNewScoreTeam1] = useState<number | null>(null);
    const [newScoreTeam2, setNewScoreTeam2] = useState<number | null>(null);
    const [newCompetitionId, setNewCompetitionId] = useState<number | null>(null);
    const [newTeam1Id, setNewTeam1Id] = useState<number | null>(null);
    const [newTeam2Id, setNewTeam2Id] = useState<number | null>(null);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const data = await CompetitionService.getAllCompetitions();
                setCompetitions(data);
            } catch (err) {
                setError('Failed to fetch competitions');
            }
        };

        const fetchTeams = async () => {
            try {
                const data = await TeamService.getAllTeams();
                setTeams(data);
            } catch (err) {
                setError('Failed to fetch teams');
            }
        };

        fetchCompetitions();
        fetchTeams();
    }, []);

    const handleCreateMatch = async () => {
        if (
            !newMatchDate ||
            !newCompetitionId ||
            !newScoreTeam1 ||
            !newScoreTeam2 ||
            !newTeam1Id ||
            !newTeam2Id
        ) {
            setError('All fields are required');
            return;
        }

        try {
            const newMatch = {
                date: newMatchDate,
                scoreTeam1: newScoreTeam1,
                scoreTeam2: newScoreTeam2,
                competition: { id: newCompetitionId },
                team1: { id: newTeam1Id },
                team2: { id: newTeam2Id },
            };

            await MatchService.createMatch(newMatch);
            setError(null);
            window.location.href = '/match';
        } catch (err) {
            setError('Failed to create match');
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Add New Match</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Match Date"
                        value={newMatchDate}
                        onChange={(e) => setNewMatchDate(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Score Team 1"
                        value={newScoreTeam1 ?? ''}
                        onChange={(e) => setNewScoreTeam1(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Score Team 2"
                        value={newScoreTeam2 ?? ''}
                        onChange={(e) => setNewScoreTeam2(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={newCompetitionId ?? ''}
                        onChange={(e) => setNewCompetitionId(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    >
                        <option value="">Select Competition</option>
                        {competitions.map((competition) => (
                            <option key={competition.id} value={competition.id}>
                                {competition.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        value={newTeam1Id ?? ''}
                        onChange={(e) => setNewTeam1Id(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    >
                        <option value="">Select Team 1</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        value={newTeam2Id ?? ''}
                        onChange={(e) => setNewTeam2Id(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    >
                        <option value="">Select Team 2</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleCreateMatch}
                    className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Match
                </button>
            </div>
        </>
    );
};

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default AddMatchPage;
