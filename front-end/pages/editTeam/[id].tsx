import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Team } from '@types';
import { GetServerSideProps } from 'next';
import UpdateTeamForm from '@components/team/updateTeamForm';
import TeamService from '@services/TeamsService';
import useSWR from 'swr';

const editTeamPage: React.FC = () => {
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

    return (
        <>
            <Head>
                <title>Profiel team</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    {team && <UpdateTeamForm team={team} />}
                </section>
            </main>
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

export default editTeamPage;
