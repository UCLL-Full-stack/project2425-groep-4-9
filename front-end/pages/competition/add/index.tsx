import React, { useState } from 'react';
import { Competition } from '@types';
import CompetitionService from '@services/CompetitionService';
import Header from '@components/header';

const AddCompetitionPage: React.FC = () => {
    const [newCompetition, setNewCompetition] = useState<Partial<Competition>>({
        name: '',
        matchesPlayed: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleCreateCompetition = async () => {
        if (!newCompetition.name || newCompetition.matchesPlayed === undefined) {
            setError('Name and Matches Played are required.');
            setSuccessMessage(null);
            return;
        }

        try {
            await CompetitionService.createCompetition(newCompetition as Competition);
            setNewCompetition({ name: '', matchesPlayed: 0 });
            setError(null);
            setSuccessMessage('Competition created successfully.');
            window.location.href = '/competition';
        } catch (err) {
            setError('Failed to create competition.');
            setSuccessMessage(null);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Add New Competition</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-semibold">
                        Competition Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter competition name"
                        value={newCompetition.name || ''}
                        onChange={(e) =>
                            setNewCompetition((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                    />

                    <label className="block text-gray-700 mb-2 font-semibold">Matches Played</label>
                    <input
                        type="number"
                        placeholder="Enter number of matches played"
                        value={newCompetition.matchesPlayed || ''}
                        onChange={(e) =>
                            setNewCompetition((prev) => ({
                                ...prev,
                                matchesPlayed: Number(e.target.value),
                            }))
                        }
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                    />

                    <button
                        onClick={handleCreateCompetition}
                        className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        Create Competition
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddCompetitionPage;