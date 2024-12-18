// import { Match } from '@prisma/client';
// import matchDb from '../repository/match.db';
// import { MatchInput } from '../types';
// import database from '../util/database';
// import { Competition } from '../model/competition';

// const createMatch = async ({
//     date,
//     scoreTeam1,
//     scoreTeam2,
//     competition,
//     team1,
//     team2,
// }: MatchInput): Promise<Match> => {
//     try {
//         if (team1.id === team2.id) {
//             throw new Error('Team1 and Team2 cannot be the same.');
//         }

//         if (competition.id === undefined) {
//             throw new Error('Competition ID is required but was undefined.');
//         }

//         if (team1.id === undefined) {
//             throw new Error('ozahpoaieru');
//         }

//         if (team2.id === undefined) {
//             throw new Error('ozahpoaieru');
//         }

//         const newcompetition = Competition.from({
//             id: competition.id,
//             name: competition.name,
//             matchesPlayed: competition.matchesPlayed,
//         });

//         const match = await matchDb.createMatch({
//             date,
//             scoreTeam1,
//             scoreTeam2,
//             competition: newcompetition,
//             team1,
//             team2,
//         });

//         return match;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create match. See server log for details.');
//     }
// };
