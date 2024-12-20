import React, { useState, useEffect } from 'react';
import { Match, Competition } from '../../types';
import MatchService from '../../services/MatchService';
import CompetitionService from '../../services/CompetitionService';
import Header from '@components/header';
import Link from 'next/link';

const MatchesPage = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const matchesData = await MatchService.getAllMatches();
                setMatches(matchesData);
            } catch (err) {
                setError('Failed to fetch matches');
            }
        };

        const fetchCompetitions = async () => {
            try {
                const competitionsData = await CompetitionService.getAllCompetitions();
                setCompetitions(competitionsData);
            } catch (err) {
                setError('Failed to fetch competitions');
            }
        };

        fetchMatches();
        fetchCompetitions();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Matches Management</h1>
                    <Link
                        href="/match/add"
                        className="border bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Match
                    </Link>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <h2 className="text-lg font-semibold mb-4">Matches</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Match ID</th>
                                <th className="border border-gray-300 px-4 py-2">Team 1</th>
                                <th className="border border-gray-300 px-4 py-2">Team 2</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.length > 0 ? (
                                matches.map((match) => (
                                    <tr key={match.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {match.id}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {match.team1.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {match.team2.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {match.date}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {match.scoreTeam1} - {match.scoreTeam2}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        No matches found
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

export default MatchesPage;
