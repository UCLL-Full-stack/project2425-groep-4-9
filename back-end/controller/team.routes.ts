/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Team:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: Team name.
 *            points:
 *              type: number
 *              format: int32
 *              description: Points earned by the team.
 */
import express, { NextFunction, Request, Response } from 'express';
import teamService from '../service/team.service';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: Retrieve a list of all teams.
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
teamRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/competition/{id}:
 *   get:
 *     summary: Get teams by competition ID
 *     description: Retrieve a list of teams in a specific competition.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The competition ID
 *     responses:
 *       200:
 *         description: A list of teams in the competition.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/competition/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionId = parseInt(req.params.id, 10);
        const teams = teamService.getTeamsByCompetition(competitionId);
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

export default teamRouter;
