import React, { useState, useEffect } from 'react';
import CompetitionService from '@services/CompetitionService';
import { Competition } from '@types';
import Link from 'next/link';
import Header from '@components/header';

const CompetitionsPage: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [competitionId, setCompetitionId] = useState<number | ''>('');

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

    const handleGetCompetitionById = async () => {
        if (!competitionId) return;
        try {
            const data = await CompetitionService.getCompetitionById(Number(competitionId));
            setCompetition(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch competition by ID.');
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
                    <h2 className="text-lg font-semibold mb-2">Filter by ID</h2>
                    <div className="flex gap-4 items-center">
                        <input
                            type="number"
                            placeholder="Competition ID"
                            value={competitionId}
                            onChange={(e) => setCompetitionId(Number(e.target.value) || '')}
                            className="border border-gray-300 rounded px-4 py-2"
                        />
                        <button
                            onClick={handleGetCompetitionById}
                            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
                        >
                            Filter
                        </button>
                    </div>
                    {competition && (
                        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
                            <p>
                                <strong>Name:</strong> {competition.name}
                            </p>
                            <p>
                                <strong>ID:</strong> {competition.id}
                            </p>
                            <p>
                                <strong>Matches Played:</strong> {competition.matchesPlayed}
                            </p>
                        </div>
                    )}
                </section>

                <h2 className="text-lg font-semibold mb-4">Competitions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Matches Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitions.length > 0 ? (
                                competitions.map((comp) => (
                                    <tr key={comp.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {comp.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {comp.matchesPlayed}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={2}
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
        </>
    );
};

export default CompetitionsPage;
