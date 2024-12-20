import Header from '@components/header';
import TeamService from '@services/TeamsService';
import { Competition } from '@types';
import React, { use, useEffect, useState } from 'react';
import Head from 'next/head';
import CompetitionOverviewTable from './CompetitionOverviewTable';
import { useTranslation } from 'react-i18next';

const Competitions: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const { t } = useTranslation();

    const getAllTeams = async () => {
        const response = await TeamService.getAllTeams();
        const json = await response.json();
        setCompetitions(json);
    };

    useEffect(() => {
        getAllTeams();
    }, []);

    return (
        <>
            <Head>
                <title>{t("competition.title2")}</title>
                <meta name="description" content="Competitions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <h1>{t("competition.title2")}</h1>
                <section>
                    <h2> {t("competition.overview")}</h2>
                </section>
                <CompetitionOverviewTable />
            </main>
        </>
    );
};

export default Competitions;
