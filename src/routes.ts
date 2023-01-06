import express from "express";
import { EnsuredAdmin } from "./shared/middlewares/EnsuredAdmin.middleware";
import { EnsuredAuthenticatedMiddleware } from "./shared/middlewares/EnsuredAuthentcated.middleware";
import { AuthUserController } from "./use-cases/Users/AuthUserUseCase/AuthUserController";
import { CreateUserController } from "./use-cases/Users/CreateUserUseCase/CreateUserController";
import { DeleteUserController } from "./use-cases/Users/DeleteUserUseCase/DeleteUserController";
import { GetAllUsersController } from "./use-cases/Users/GetAllUsersUseCase/GetAllUsersController";
import { GetUserByIdController } from "./use-cases/Users/GetUserByIdUseCase/GetUserByIdController";
import { GetUserByUsernameController } from "./use-cases/Users/GetUserByUsernameUseCase/GetUserByUsernameController";
import { UpdateUserController } from "./use-cases/Users/UpdateUserUseCase/UpdateUserController";

export const routes = express.Router();

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const authUserController = new AuthUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const deleteAllUsersController = new DeleteUserController();
const getUserByUsernameController = new GetUserByUsernameController();

const ensuredAuthenticatedMiddleware = new EnsuredAuthenticatedMiddleware();

const ensuredAdminMiddleware = new EnsuredAdmin();

//rotas públicas
routes.post("/users", createUserController.handle);
routes.post("/users/auth", authUserController.handle);
routes.get("/users", getAllUsersController.handle);
routes.get("/user/:username", getUserByUsernameController.handle);

//rotas privadas
routes.use(ensuredAuthenticatedMiddleware.handle);
routes.get("/user", getUserByIdController.handle);
routes.put("/user", updateUserController.handle);
routes.delete("/user", deleteUserController.handle);

//rotas administrativas
routes.use(ensuredAdminMiddleware.handle);
routes.delete("/users/all", deleteAllUsersController.handle);
