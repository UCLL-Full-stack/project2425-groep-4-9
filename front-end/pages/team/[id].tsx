import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '@components/user/UserRegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const teamProfiel: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const fetchTeam = async (): Promise<Team | null> => {
        try {
            const response = await TeamService.getTeamById(parseInt(id as string));
            return response;
        } catch (error) {
            console.error('Error fetching team:', error);
            return null;
        }
    };

    const {
        data: team,
        isLoading,
        error,
    } = useSWR('fetchTeam', fetchTeam, {
        refreshInterval: 1000,
    });

    const goToEditPage = async (event: React.FormEvent) => {
        event.preventDefault();
        router.push(`/editTeam/${id}`);
    };

    return (
        <>
            <Head>
                <title>Profiel team</title>
            </Head>
            <Header />
            <main className="bg-gray-100 min-h-screen">
                <section className="p-6 flex flex-col items-center">
                    {isLoading && <p className="text-gray-500 text-lg">Loading...</p>}
                    {error && <p className="text-red-500 text-lg">An error has occurred</p>}
                    {team && (
                        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-xl">
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                                {team.name}
                            </h1>
                            <div className="flex justify-between">
                                <span className="text-lg font-medium text-gray-600">Points:</span>
                                <span className="text-lg font-semibold text-gray-800">
                                    {team.points}
                                </span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-lg font-medium text-gray-600">
                                    Competition:
                                </span>
                                <span className="text-lg font-semibold text-gray-800">
                                    {team.competition.name}
                                </span>
                            </div>
                        </div>
                    )}
                </section>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={goToEditPage}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Edit
                    </button>
                </div>
            </main>
        </>
    );
};

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import TeamService from '@services/TeamsService';
import { Team } from '@types';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default teamProfiel;
