import React, { useState, useEffect } from 'react';
import CompetitionService from '@services/CompetitionService';
import { Competition, Team } from '@types';
import Link from 'next/link';
import Header from '@components/header';
import TeamService from '@services/TeamsService';

const CompetitionsPage: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [competitionName, setCompetitionName] = useState<string>('');

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const data = await CompetitionService.getAllCompetitions();
                setCompetitions(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch all competitions.');
            }
        };

        fetchCompetitions();
    }, []);

    const handleCompetitionClick = async (id: number) => {
        try {
            const data = await CompetitionService.getCompetitionById(id);
            setCompetition(data);
            setError(null);

            const teamsData = await TeamService.getTeamsByCompetition(id);
            setTeams(teamsData);
        } catch (err) {
            setError('Failed to fetch competition by ID or associated teams.');
            setTeams([]);
        }
    };

    const handleDeleteCompetition = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this competition?')) {
            try {
                await CompetitionService.deleteCompetition(id);
                setCompetitions(competitions.filter((comp) => comp.id !== id));
                setError(null);
            } catch (err) {
                setError('Failed to delete competition.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold">Competitions Management</h1>
                    <Link
                        href="/competition/add"
                        className="border bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 m-2"
                    >
                        Add Competition
                    </Link>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Search by Name</h2>
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Competition Name"
                            value={competitionName}
                            onChange={(e) => setCompetitionName(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </section>

                <div className="flex gap-8">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-4">Competitions</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">Name</th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Matches Played
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitions.length > 0 ? (
                                        competitions
                                            .filter((comp) =>
                                                comp.name
                                                    .toLowerCase()
                                                    .includes(competitionName.toLowerCase())
                                            )
                                            .map((comp) => (
                                                <tr key={comp.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {comp.name}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {comp.matchesPlayed}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            onClick={() =>
                                                                handleCompetitionClick(comp.id)
                                                            }
                                                            className="text-blue-500 hover:underline mr-4"
                                                        >
                                                            View Teams
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteCompetition(comp.id)
                                                            }
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
                                                colSpan={3}
                                                className="border border-gray-300 px-4 py-2 text-center"
                                            >
                                                No competitions found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex-1">
                        {teams.length > 0 && (
                            <>
                                <h2 className="text-lg font-semibold mb-4">
                                    Teams in Selected Competition
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Team Name
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Points
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teams.map((team) => (
                                                <tr key={team.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {team.name}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {team.points}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
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

export default CompetitionsPage;
