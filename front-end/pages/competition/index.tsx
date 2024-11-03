// pages/competition.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TeamService from '@services/TeamsService';
import Header from '@components/header';

interface Competition {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    points: number;
    competitionId: number;
}

const Competition: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/competitions');
                if (!response.ok) throw new Error('Failed to fetch competitions');
                const data = await response.json();
                setCompetitions(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchCompetitions();
    }, []);

    useEffect(() => {
        if (selectedCompetitionId === null) return;

        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await TeamService.fetchTeamsByCompetition(selectedCompetitionId);
                if (!response.ok) throw new Error('Failed to fetch teams');
                const data = await response.json();
                setTeams(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [selectedCompetitionId]);

    return (
        <>
            <Head>
                <title>Competitions</title>
            </Head>
            <Header />
            <main>
                <h1>Select a Competition</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {competitions.map((competition) => (
                        <li
                            key={competition.id}
                            style={{
                                cursor: 'pointer',
                                color: competition.id === selectedCompetitionId ? 'blue' : 'black',
                            }}
                            onClick={() => setSelectedCompetitionId(competition.id)}
                        >
                            {competition.name}
                        </li>
                    ))}
                </ul>
                {selectedCompetitionId && (
                    <>
                        <h2>
                            Teams in{' '}
                            {competitions.find((c) => c.id === selectedCompetitionId)?.name}
                        </h2>
                        {loading ? (
                            <p>Loading teams...</p>
                        ) : (
                            <ul>
                                {teams.map((team) => (
                                    <li key={team.id}>
                                        {team.name} - Points: {team.points}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default Competition;
