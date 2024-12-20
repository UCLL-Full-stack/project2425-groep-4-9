import { authUser, User, createUser as createUserType } from '@types';

const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

const getUserById = async (id: number) => {
    const token = localStorage.getItem('token');
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

const getUserByName = async (name: string) => {
    const token = localStorage.getItem('token');
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/name/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

const createUser = async (user: createUserType) => {
    const token = localStorage.getItem('token');
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(user),
    });
};

const loginUser = (user: authUser) => {
    const token = localStorage.getItem('token');
    console.log('service', user);
    console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    loginUser,
};

export default UserService;
