import { Request, Response } from 'express';
import { MongoDatabase } from 'database/db';

export const asyncRunner = async (
    req: Request,
    res: Response,
    asyncFunction: (Request, Response, db: MongoDatabase) => Promise<any>,
) => {
    try {
        const db = await MongoDatabase.init();
        await asyncFunction(req, res, db);
    } catch (e) {
        console.log('error', e.message);
        res.status(e.status ? e.status : 500).send({ error: e.message });
    }
};
