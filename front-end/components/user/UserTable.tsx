import React from 'react';

const UserTable: React.FC = () => {
    const users = [
        { name: 'admin', password: 'admin1', role: 'admin' },
        { name: 'user', password: 'user1', role: 'owner' },
    ];

    return (
        <div className="overflow-x-auto mt-12">
            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Password</th>
                        <th className="border border-gray-400 px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border border-gray-400 px-4 py-2">admin</td>
                        <td className="border border-gray-400 px-4 py-2">admin1</td>
                        <td className="border border-gray-400 px-4 py-2">admin</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                        <td className="border border-gray-400 px-4 py-2">user</td>
                        <td className="border border-gray-400 px-4 py-2">user1</td>
                        <td className="border border-gray-400 px-4 py-2">owner</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
