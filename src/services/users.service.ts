import { Request, Response } from 'express';
import User from 'models/user.model';
import { MongoDatabase, Collections } from 'database/db';
import HttpError from 'exceptions/HttpException';
import { hashPassword, passwordMatch, generateJWT } from 'utils/encryption';
import { asyncRunner } from 'utils/async';
import { authReq } from 'interfaces/token.interface';

export default class UsersService {
    createUser = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: MongoDatabase) => {
            const { email, password } = req.body;
            if (!(email && password)) {
                throw new HttpError(400, 'Missing required fields email and password');
            }

            const existingUser = await db.getOneDocument(Collections.Users, { email });
            if (existingUser) {
                throw new HttpError(409, `A user with the email ${email} already exists`);
            }

            const hashPass = await hashPassword(password);
            const newUser = new User(email, hashPass);

            const insertResult = await db.insertDocument(Collections.Users, newUser);

            res.status(201).send({ token: generateJWT(insertResult.ops[0]) });
        });
    };

    login = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: MongoDatabase) => {
            const { email, password } = req.body;

            if (!(email && password)) {
                throw new HttpError(400, 'Missing required fields email and password');
            }

            const user = await db.getOneDocument(Collections.Users, { email });

            if (!user) {
                throw new HttpError(404, `User does not exist`);
            }

            passwordMatch(password, user.password);

            res.send({ token: generateJWT(user) });
        });
    };

    getCurrentUser = async (req: authReq, res: Response) => {
        res.send({ ...req.decodedToken });
    };
}
