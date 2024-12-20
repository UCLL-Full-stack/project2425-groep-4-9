/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the team.
 *         name:
 *           type: string
 *           description: Team name.
 *         points:
 *           type: number
 *           description: Team points.
 *         competitionId:
 *           type: number
 *           description: Competition ID.
 *         userId:
 *           type: number
 *           description: User ID.
 *     TeamInput:
 *       type: object
 *       required:
 *         - name
 *         - competitionId
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *         competitionId:
 *           type: number
 *         userId:
 *           type: number
 */

import express, { Request, Response } from 'express';
import teamService from '../service/team.service';
import { TeamInput, TeamUpdate } from '../types';
import { extractRole } from '../util/jwt';
const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get a list of all teams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: A team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
teamRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const team = await teamService.getTeamById({ id: Number(req.params.id) });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'wrong' });
    }
});

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInput'
 *     responses:
 *       200:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Error creating team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
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

/**
 * @swagger
 * /teams/competition/{competitionId}:
 *   get:
 *     summary: Get teams by competition ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: competitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The competition ID
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       400:
 *         description: Invalid competition ID
 *       500:
 *         description: Unable to fetch teams for competition
 */

teamRouter.get('/competition/:competitionId', async (req: Request, res: Response) => {
    try {
        const competitionId = Number(req.params.competitionId);

        if (isNaN(competitionId)) {
            return res
                .status(400)
                .json({ status: 'error', errorMessage: 'Invalid competition ID' });
        }

        const teams = await teamService.getTeamsByCompetition({ competitionId });
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams by competition:', error);
        res.status(500).json({
            status: 'error',
            errorMessage: 'Unable to fetch teams for competition',
        });
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInput'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Error updating team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
teamRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const team = <TeamUpdate>req.body;
        const result = await teamService.updateTeam({ ...team, id: Number(req.params.id) });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(400).json({
            status: 'error',
            errorMessage: 'An unknown error occurred',
        });
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       500:
 *         description: Error deleting team
 */
teamRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = extractRole(req);

    if (role !== 'admin') {
        return res.status(403).json({
            status: 'Role',
            errorMessage: 'You are not authorized to access this resource',
        });
    }

    try {
        await teamService.deleteTeam({ id: Number(id) });
        res.status(200).json({ message: `Team with id ${id} has been successfully deleted.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            errorMessage: 'An error occurred while trying to delete the team.',
        });
    }
});

export default teamRouter;
