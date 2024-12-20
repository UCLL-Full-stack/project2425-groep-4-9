import React, { useState, useEffect } from 'react';
import TeamService from '@services/TeamsService';
import { Team } from '@types';
import router from 'next/router';

type Props = { team: Team };

const UpdateTeamForm: React.FC<Props> = (props) => {
    const team = props.team;
    const [name, setName] = useState<string>(team.name);
    const [nameError, setNameError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setNameError('');

        let isValid = true;

        if (name.trim().length < 2) {
            setNameError('Naam is te kort');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const id = team.id;
        const changeTeam = {
            name,
            competitionId: team.competition.id,
            userId: team.userId,
        };
        console.log(changeTeam);

        const response = await TeamService.updateTeam(id, changeTeam);
        console.log(response);
        console.log('status', response.status);
        if (response.ok) {
            setTimeout(async () => {
                await router.push(`/team/${team.id}`);
            }, 2000);
        } else {
            const error = await response.json();
            console.log([{ type: 'error', message: error.email }]); // <-- ????
        }
    };

    return (
        <form className="flex flex-col space-y-10 p-0 lg:p-6" onSubmit={handleSubmit}>
            <label htmlFor="description" className="flex flex-col">
                <h2 className="mb-2 font-semibold">
                    Naam veranderen<span className="font-bold text-red-500"> * </span>{' '}
                </h2>
                <input
                    id="name"
                    type="text"
                    required
                    className="rounded-lg border-2 p-3 text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit} className="col-start-3 justify-self-end">
                Save changes
            </button>
        </form>
    );
};

export default UpdateTeamForm;
