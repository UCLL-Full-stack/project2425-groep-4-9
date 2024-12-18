import { User } from '../model/user';
import { UserInput } from '../types';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: {
                team: {
                    include: {
                        competition: true,
                    },
                },
            },
        });
        console.log(userPrisma);
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('no teams');
    }
};

const getUserByName = async ({ name }: { name: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { name },
            include: {
                team: {
                    include: {
                        competition: true,
                    },
                },
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({ name, password, role, teamId }: UserInput) => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name,
                password,
                role,
                team: teamId ? { connect: { id: teamId } } : undefined,
            },
            include: {
                team: {
                    include: {
                        competition: true,
                    },
                },
            },
        });
        return userPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs');
    }
};

export default {
    getAllUsers,
    createUser,
    getUserByName,
};
