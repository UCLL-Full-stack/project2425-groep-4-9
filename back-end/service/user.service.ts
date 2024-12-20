import userDB from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, TeamInput, UserInput } from '../types';
import userDb from '../repository/user.db';
import teamDb from '../repository/team.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDB.getAllUsers();
    return users;
};

const createUser = async ({ name, password, role }: UserInput) => {
    const existing = await userDb.getUserByName({ name });
    if (existing) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, password: hashedPassword, role, team: null });

    const newUser = await userDb.createUser(user);
    return newUser;
};

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    return user;
};

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};

const authenticate = async ({ name, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    const passwordMatch = await bcrypt.compare(password, user.getPassword());
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    return { token: generateJwtToken({ name, role: user.getRole() }), name: user.name };
};
export default { getAllUsers, createUser, getUserByName, getUserById, authenticate };
