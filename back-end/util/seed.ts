import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.match.deleteMany();
    await prisma.team.deleteMany();
    await prisma.competition.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            name: 'admin',
            password: await bcrypt.hash('admin1', 10),
            role: 'admin',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'user',
            password: await bcrypt.hash('user1', 10),
            role: 'owner',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'user2',
            password: await bcrypt.hash('user2', 10),
            role: 'owner',
        },
    });

    const user4 = await prisma.user.create({
        data: {
            name: 'user3',
            password: await bcrypt.hash('user3', 10),
            role: 'owner',
        },
    });

    const user5 = await prisma.user.create({
        data: {
            name: 'user4',
            password: await bcrypt.hash('user4', 10),
            role: 'owner',
        },
    });

    const user6 = await prisma.user.create({
        data: {
            name: 'user5',
            password: await bcrypt.hash('user5', 10),
            role: 'owner',
        },
    });

    const user7 = await prisma.user.create({
        data: {
            name: 'user6',
            password: await bcrypt.hash('user6', 10),
            role: 'owner',
        },
    });

    const user8 = await prisma.user.create({
        data: {
            name: 'user7',
            password: await bcrypt.hash('user7', 10),
            role: 'owner',
        },
    });

    const user9 = await prisma.user.create({
        data: {
            name: 'user8',
            password: await bcrypt.hash('user8', 10),
            role: 'owner',
        },
    });

    const user10 = await prisma.user.create({
        data: {
            name: 'user9',
            password: await bcrypt.hash('user9', 10),
            role: 'owner',
        },
    });

    const user11 = await prisma.user.create({
        data: {
            name: 'user10',
            password: await bcrypt.hash('user10', 10),
            role: 'owner',
        },
    });

    const user12 = await prisma.user.create({
        data: {
            name: 'user11',
            password: await bcrypt.hash('user11', 10),
            role: 'owner',
        },
    });

    const user13 = await prisma.user.create({
        data: {
            name: 'user12',
            password: await bcrypt.hash('user12', 10),
            role: 'owner',
        },
    });

    const competition1 = await prisma.competition.create({
        data: {
            name: 'Pro League',
            matchesPlayed: 5,
        },
    });

    const competition2 = await prisma.competition.create({
        data: {
            name: 'Challenger pro League',
            matchesPlayed: 10,
        },
    });

    const team1 = await prisma.team.create({
        data: {
            name: 'Rsc Anderlecht',
            points: 3,
            competitionId: competition1.id,
            userId: user1.id,
        },
    });

    const team2 = await prisma.team.create({
        data: {
            name: 'Club Brugge',
            points: 9,
            competitionId: competition1.id,
            userId: user2.id,
        },
    });

    const team3 = await prisma.team.create({
        data: {
            name: 'Standard de Liège',
            points: 2,
            competitionId: competition1.id,
            userId: user3.id,
        },
    });

    const team4 = await prisma.team.create({
        data: {
            name: 'KRC Genk',
            points: 4,
            competitionId: competition1.id,
            userId: user4.id,
        },
    });

    const team5 = await prisma.team.create({
        data: {
            name: 'KAA Gent',
            points: 6,
            competitionId: competition1.id,
            userId: user5.id,
        },
    });

    const team6 = await prisma.team.create({
        data: {
            name: 'KV Mechelen',
            points: 9,
            competitionId: competition1.id,
            userId: user6.id,
        },
    });

    const team7 = await prisma.team.create({
        data: {
            name: 'Cercle Brugge',
            points: 0,
            competitionId: competition1.id,
            userId: user7.id,
        },
    });

    const team8 = await prisma.team.create({
        data: {
            name: 'STVV',
            points: 1,
            competitionId: competition1.id,
            userId: user8.id,
        },
    });

    const team9 = await prisma.team.create({
        data: {
            name: 'KV Oostende',
            points: 3,
            competitionId: competition2.id,
            userId: user9.id,
        },
    });

    const team10 = await prisma.team.create({
        data: {
            name: 'Waasland-Beveren',
            points: 5,
            competitionId: competition2.id,
            userId: user10.id,
        },
    });

    const team11 = await prisma.team.create({
        data: {
            name: 'Sk Lierse',
            points: 10,
            competitionId: competition2.id,
            userId: user11.id,
        },
    });

    const team12 = await prisma.team.create({
        data: {
            name: 'Sk Lommel',
            competitionId: competition2.id,
            points: 12,
            userId: user12.id,
        },
    });

    const team13 = await prisma.team.create({
        data: {
            name: 'KSV Roeselare',
            points: 0,
            competitionId: competition2.id,
            userId: user13.id,
        },
    });

    const match1 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 1,
            scoreTeam2: 2,
            competitionId: competition1.id,
            team1Id: team1.id,
            team2Id: team2.id,
        },
    });

    const match2 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 3,
            scoreTeam2: 0,
            competitionId: competition1.id,
            team1Id: team3.id,
            team2Id: team4.id,
        },
    });

    const match3 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 3,
            scoreTeam2: 0,
            competitionId: competition1.id,
            team1Id: team5.id,
            team2Id: team6.id,
        },
    });

    const match4 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 0,
            scoreTeam2: 2,
            competitionId: competition1.id,
            team1Id: team7.id,
            team2Id: team8.id,
        },
    });

    const match5 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 1,
            scoreTeam2: 3,
            competitionId: competition1.id,
            team1Id: team1.id,
            team2Id: team3.id,
        },
    });

    const match6 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 2,
            scoreTeam2: 1,
            competitionId: competition2.id,
            team1Id: team9.id,
            team2Id: team10.id,
        },
    });

    const match7 = await prisma.match.create({
        data: {
            date: set(new Date(), { hours: 20 }),
            scoreTeam1: 1,
            scoreTeam2: 1,
            competitionId: competition2.id,
            team1Id: team11.id,
            team2Id: team12.id,
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
