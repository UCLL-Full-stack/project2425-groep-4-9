import express, { Request, Response } from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types';
const teamRouter = express.Router();

teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
    }
});

teamRouter.post('/', async (req: Request, res: Response) => {
    try {
        const team = <TeamInput>req.body;

        if (!team.name || !team.competitionId || !team.userId) {
            return res
                .status(400)
                .json({ status: 'error', errorMessage: 'Missing required fields' });
        }
        const result = await teamService.createTeam(team);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(400).json({
            status: 'error',
            errorMessage: 'An unknown error occurred',
        });
    }
});

export default teamRouter;
