/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Competition:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: Competition name.
 *      UserInput:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - role
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            description: Unique identifier for the user.
 *          name:
 *            type: string
 *            description: User name.
 *          password:
 *            type: string
 *            description: User password.
 *          role:
 *            type: string
 *            description: User role.
 *          teamId:
 *            type: number
 *            description: Team ID.
 *      AuthenticationResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *          name:
 *            type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
const userRouter = express.Router();


/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById({ id: Number(req.params.id) });
        if (!user) {
            return res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Invalid request' });
    }
});


/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error creating user
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
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: MySecretPassword123
 *     responses:
 *       200:
 *         description: User authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.authenticate(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/name/{name}:
 *   get:
 *     summary: Get a user by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/name/:name', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserByName({ name: req.params.name });
        if (!user) {
            return res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by name:', error);
        res.status(500).json({ status: 'error', errorMessage: 'Unable to fetch user by name' });
    }
});


export default userRouter;

