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
import competitionService from '../service/competition.service';
const competitionRouter = express.Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get all competitions
 *     description: Retrieve a list of all competitions.
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 */
competitionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitons = competitionService.getAllCompetitions();
        res.status(200).json(competitons);
    } catch (error) {
        next(error);
    }
});

export default competitionRouter;
