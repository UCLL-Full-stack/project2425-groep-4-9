/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the match.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the match.
 *         scoreTeam1:
 *           type: number
 *           description: Score of team 1.
 *         scoreTeam2:
 *           type: number
 *           description: Score of team 2.
 *         competition:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: Competition ID.
 *         team1:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: Team 1 ID.
 *         team2:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: Team 2 ID.
 *     MatchInput:
 *       type: object
 *       required:
 *         - date
 *         - scoreTeam1
 *         - scoreTeam2
 *         - competition
 *         - team1
 *         - team2
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         scoreTeam1:
 *           type: number
 *         scoreTeam2:
 *           type: number
 *         competition:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *         team1:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *         team2:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 */

import express, { Request, Response } from 'express';
import matchService from '../service/match.service';
import { Match } from '../model/match';
const matchRouter = express.Router();

/**
 * @swagger
 * /match:
 *   get:
 *     summary: Get a list of all matches
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of matches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
matchRouter.get('/', async (req: Request, res: Response) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        console.log(error);
    }
});

/**
 * @swagger
 * /match/{id}:
 *   get:
 *     summary: Get a match by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The match ID
 *     responses:
 *       200:
 *         description: A match object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Match not found
 */
matchRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const match = await matchService.getMatchById(Number(req.params.id));
        res.status(200).json(match);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Invalid request' });
    }
});

/**
 * @swagger
 * /match:
 *   post:
 *     summary: Create a new match
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchInput'
 *     responses:
 *       200:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Error creating match
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
matchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const match = <Match>req.body;
        const result = await matchService.createMatch(match);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(400).json({
            status: 'error',
            errorMessage: 'An unknown error occurred',
        });
    }
});

export default matchRouter;
