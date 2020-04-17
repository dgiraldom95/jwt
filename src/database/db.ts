import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb';

export enum Collections {
    Users = 'users',
}

export class MongoDatabase {
    // Connection URL
    url = 'mongodb://localhost:27017';

    // Database Name
    dbName = 'testjwt';

    client = new MongoClient(this.url);
    db: Db;

    static init = async (): Promise<MongoDatabase> => {
        const mongoDB = new MongoDatabase();
        await mongoDB.connect();
        return mongoDB;
    };

    private connect = async () => {
        await new Promise((resolve, reject) => {
            this.client.connect((error, result) => {
                if (error) {
                    throw new Error("Couldn't connect to the database: " + error.message);
                }
                resolve();
            });
        });
        this.db = this.client.db(this.dbName);
    };

    insertDocument = async (collection: Collections, document: any): Promise<InsertOneWriteOpResult<any>> => {
        const collectionInsert = this.db.collection(collection);
        return collectionInsert.insertOne(document);
    };

    getDocuments = async (collection: Collections, filters?: any) => {
        const collectionGet = this.db.collection(collection);
        return collectionGet.find({ ...filters }).toArray();
    };

    getOneDocument = async (collection: Collections, filters?: any) => {
        const collectionGet = this.db.collection(collection);
        return collectionGet.findOne({ ...filters });
    };
}
