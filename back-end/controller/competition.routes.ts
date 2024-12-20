/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Competition:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the competition.
 *         name:
 *           type: string
 *           description: Competition name.
 *         matchesPlayed:
 *           type: number
 *           description: Number of matches played in the competition.
 *     CompetitionInput:
 *       type: object
 *       required:
 *         - name
 *         - matchesPlayed
 *       properties:
 *         name:
 *           type: string
 *         matchesPlayed:
 *           type: number
 */

import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';
import { CompetitionInput } from '../types';
import { extractRole } from '../util/jwt';
const competitionRouter = express.Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get a list of all competitions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of competitions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 */
competitionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const competitions = await competitionService.getAllCompetitions();
        res.status(200).json(competitions);
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /competitions/{id}:
 *   get:
 *     summary: Get a competition by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The competition ID
 *     responses:
 *       200:
 *         description: A competition object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found
 */
competitionRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const competition = await competitionService.getCompetitionById(Number(req.params.id));
        res.status(200).json(competition);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Invalid request' });
    }
});

/**
 * @swagger
 * /competitions/name/{name}:
 *   get:
 *     summary: Get a competition by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The competition name
 *     responses:
 *       200:
 *         description: A competition object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found
 */
competitionRouter.get('/name/:name', async (req: Request, res: Response) => {
    try {
        const competition = await competitionService.getCompetitionByName({
            name: req.params.name,
        });
        if (!competition) {
            return res.status(404).json({ status: 'error', errorMessage: 'Competition not found' });
        }
        res.status(200).json(competition);
    } catch (error) {
        console.error('Error fetching competition by name:', error);
        res.status(500).json({
            status: 'error',
            errorMessage: 'Unable to fetch competition by name',
        });
    }
});

/**
 * @swagger
 * /competitions/{id}:
 *   delete:
 *     summary: Delete a competition by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the competition to delete.
 *     responses:
 *       200:
 *         description: Competition deleted successfully.
 *       404:
 *         description: Competition not found.
 *       500:
 *         description: Internal server error.
 */
competitionRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const role = extractRole(req);

        if (role !== 'admin') {
            return res.status(403).json({ status: 'Role', errorMessage: 'You are not authorized to access this resource' });
        }

        await competitionService.deleteCompetition(id);
        res.status(200).json({ message: 'Competition deleted successfully' });
    } catch (error) {
        console.error('Error deleting competition:', error);
        res.status(500).json({ status: 'error', errorMessage: 'fout' });
    }
});

/**
 * @swagger
 * /competitions:
 *   post:
 *     summary: Create a new competition
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompetitionInput'
 *     responses:
 *       200:
 *         description: Competition created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       400:
 *         description: Error creating competition
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
competitionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const competition = <CompetitionInput>req.body;
        const result = await competitionService.createCompetition(competition);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error creating competition' });
    }
});

export default competitionRouter;
