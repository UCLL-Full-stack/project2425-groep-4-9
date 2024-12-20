import { Competition, Team, User } from '../../types';
import React, { useEffect, useState } from 'react';
import TeamService from '../../services/TeamsService';
import CompetitionService from '../../services/CompetitionService';
import Header from '@components/header';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const TeamsPage = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsData = await TeamService.getAllTeams();
                setTeams(teamsData);
            } catch (error) {
                setError('Failed to fetch teams');
            }
        };

        const fetchCompetitions = async () => {
            try {
                const data = await CompetitionService.getAllCompetitions();
                setCompetitions(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch all competitions.');
            }
        };

        fetchTeams();
        fetchCompetitions();
    }, []);

    const handleFilterByCompetition = async () => {
        if (selectedCompetition) {
            try {
                const filteredTeams = await TeamService.getTeamsByCompetition(selectedCompetition);
                setTeams(filteredTeams);
            } catch (error) {
                setError('Failed to fetch teams for the selected competition');
            }
        }
    };

    const handleDeleteTeam = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            try {
                await TeamService.deleteTeam(id);
                setTeams(teams.filter((team) => team.id !== id));
                setError(null);
            } catch (err) {
                setError('Failed to delete team.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{t('team.management')}</h1>
                    <Link
                        href="/team/add"
                        className="border bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {t('team.add')}
                    </Link>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{t('team.filter')}</h2>
                    <div className="flex gap-4 items-center">
                        <select
                            className="border border-gray-300 rounded px-4 py-2"
                            onChange={(e) => setSelectedCompetition(Number(e.target.value))}
                        >
                            <option value="">Select Competition</option>
                            {competitions.map((competition) => (
                                <option key={competition.id} value={competition.id}>
                                    {competition.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleFilterByCompetition}
                            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Teams</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">
                                    {t('team.name')}
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    {t('team.points')}
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    {t('team.competition')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <tr key={team.id} className="hover:bg-gray-50 text-center">
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Link key={team.id} href={`/team/${team.id}`}>
                                                {team.name}
                                            </Link>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {team.points}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {team.competition.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDeleteTeam(team.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        {t('team.noTeams')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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

export default TeamsPage;
