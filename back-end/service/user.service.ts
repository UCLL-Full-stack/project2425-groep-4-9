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

// const createUser = async ({ name, password, role, team: teamInput }: UserInput): Promise<User> => {
//     const team = await teamDb.getTeamById({ id: teamInput.id });
//     const user = new User({ name, password, role, team });
//     return await userDB.createUser(user);
// };

const createUser = async ({ name, password, role, team }: UserInput) => {
    try {
        // Check if 'team' is provided, if not, don't include 'team' in the data
        const data: any = {
            name,
            password,
            role,
        };

        if (team) {
            // Only include 'team' if it exists in the input
            data.team = { connect: { id: team.id } };
        }

        // Call the database function to create a user with the prepared data
        const newUser = await userDb.createUser(data); // Pass the data
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error in creating user. See logs for details');
    }
};

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};

const authenticate = async ({name, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByName({name});
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    const passwordMatch = await bcrypt.compare(password, user.getPassword());
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    return {token: generateJwtToken({ name, role: user.getRole(), }),
            name: user.name,
    };
}

export default { getAllUsers, createUser, getUserByName, authenticate };
