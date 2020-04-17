import { Router } from 'express';
import Route from 'interfaces/routes.interface';
import UsersService from 'services/users.service';

class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersService = new UsersService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.usersService.createUser);
        this.router.post(`${this.path}/login`, this.usersService.login);
        this.router.get(this.path, this.usersService.getCurrentUser);
    }
}

export default UsersRoute;
