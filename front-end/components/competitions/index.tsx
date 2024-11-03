import Header from '@components/header';
import TeamService from '@services/TeamsService';
import { Competition } from "@types"
import React, { use, useEffect, useState} from 'react';
import Head from 'next/head';

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

 const getAllTeams = async () => {
    const response = await TeamService.getAllTeams();
    const json = await response.json();
    setCompetitions(json);
 }

 useEffect(() => {
    getAllTeams();
    }, []);

  return (
    <>
      <Head>
        <title>Competitions</title>
        <meta name="description" content="Competitions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1>Competitions</h1>
         <section>
            <h2> Competitions overview</h2>
         </section>
         {competitions && <CompetitionOverviewTable competitions={competitions} />}
      </main>
    </>
  );
};

