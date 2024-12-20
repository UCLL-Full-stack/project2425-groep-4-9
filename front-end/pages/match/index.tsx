import React, { useState, useEffect } from 'react';
import MatchService from '@services/MatchService';
import { Match } from '@types';

const MatchesPage = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newMatchDate, setNewMatchDate] = useState<string>('');
    const [newScoreTeam1, setNewScoreTeam1] = useState<number | null>(null);
    const [newScoreTeam2, setNewScoreTeam2] = useState<number | null>(null);
    const [newCompetitionId, setNewCompetitionId] = useState<number | null>(null);
    const [newTeam1Id, setNewTeam1Id] = useState<number | null>(null);
    const [newTeam2Id, setNewTeam2Id] = useState<number | null>(null);
    const [newTeamName, setNewTeamName] = useState('');
    const [newUserId, setNewUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            try {
                const matchesData = await MatchService.getAllMatches();
                setMatches(matchesData);
            } catch (err) {
                setError('Failed to fetch matches');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
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
                competition: {
                    id: newCompetitionId,
                },
                team1: {
                    id: newTeam1Id,
                },
                team2: {
                    id: newTeam2Id,
                },
            };
            const createdMatch = await MatchService.createMatch(newMatch);
            setMatches((prev) => [...prev, createdMatch]);
            setNewCompetitionId(null);
            setNewTeamName('');
            setNewUserId(null);
            setNewMatchDate('');
            setNewScoreTeam1(null);
            setNewScoreTeam2(null);
            setNewTeam1Id(null);
            setNewTeam2Id(null);
        } catch (error) {
            setError('failed to create match');
        }
    };

    return (
        <div>
            <h1>Matches</h1>

            {/* Display error */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Display loading state */}
            {loading && <div>Loading...</div>}

            {/* Display all matches */}
            <div>
                <h2>All Matches</h2>
                <ul>
                    {matches.map((match) => (
                        <li key={match.id}>
                            <strong>Match {match.id}</strong>: {match.team1.name} vs{' '}
                            {match.team2.name} | {match.date} | Score: {match.scoreTeam1}-
                            {match.scoreTeam2}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Form to create new match */}
            <div>
                <h2>Create New Match</h2>
                <input
                    type="text"
                    placeholder="Match Date"
                    value={newMatchDate}
                    onChange={(e) => setNewMatchDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Score Team 1"
                    value={newScoreTeam1 ?? ''}
                    onChange={(e) => setNewScoreTeam1(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Score Team 2"
                    value={newScoreTeam2 ?? ''}
                    onChange={(e) => setNewScoreTeam2(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Competition ID"
                    value={newCompetitionId ?? ''}
                    onChange={(e) => setNewCompetitionId(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Team 1 ID"
                    value={newTeam1Id ?? ''}
                    onChange={(e) => setNewTeam1Id(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Team 2 ID"
                    value={newTeam2Id ?? ''}
                    onChange={(e) => setNewTeam2Id(Number(e.target.value))}
                />
                <button onClick={handleCreateMatch}>Create Match</button>
            </div>
        </div>
    );
};

export default MatchesPage;
