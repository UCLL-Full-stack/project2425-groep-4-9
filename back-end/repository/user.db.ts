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
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('no teams');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
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

const createUser = async ({ name, password, role, team }: User) => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name,
                password,
                role,
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
    getUserById,
    getUserByName,
};
