import React, { useState, useEffect } from 'react';
import { Competition } from '../../../types';
import TeamService from '../../../services/TeamsService';
import CompetitionService from '../../../services/CompetitionService';
import Header from '@components/header';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const AddTeamPage = () => {
    const [newTeamName, setNewTeamName] = useState('');
    const [newUserId, setNewUserId] = useState<number | null>(null);
    const [newCompetitionId, setNewCompetitionId] = useState<number | null>(null);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const data = await CompetitionService.getAllCompetitions();
                setCompetitions(data);
            } catch (err) {
                setError('Failed to fetch competitions');
            }
        };

        fetchCompetitions();
    }, []);

    const handleCreateTeam = async () => {
        if (!newTeamName || !newUserId || !newCompetitionId) {
            setError('All fields are required');
            return;
        }

        try {
            const newTeam = {
                id: 0,
                name: newTeamName,
                points: 0,
                userId: newUserId,
                user: { id: newUserId, name: '', password: '', role: 'player' },
                competitionId: newCompetitionId,
                competition: {
                    id: newCompetitionId,
                    name: '',
                    matchesPlayed: 0,
                    teams: [],
                    matches: [],
                },
                matchesAsTeam1: [],
                matchesAsTeam2: [],
            };

            await TeamService.createTeam(newTeam);
            setError(null);
            window.location.href = '/team';
        } catch (error) {
            setError('Failed to create team');
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">{t('team.add2')}</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="User ID"
                        value={newUserId ?? ''}
                        onChange={(e) => setNewUserId(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={newCompetitionId ?? ''}
                        onChange={(e) => setNewCompetitionId(Number(e.target.value))}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    >
                        <option value="">{t('team.select')}</option>
                        {competitions.map((competition) => (
                            <option key={competition.id} value={competition.id}>
                                {competition.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleCreateTeam}
                    className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                >
                    {t('team.Create')}
                </button>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default AddTeamPage;
