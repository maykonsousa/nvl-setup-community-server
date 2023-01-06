import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAllUsersUseCase } from "./DeleteAllUsersUseCase";

export class DeleteAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteAllUsersUseCase = container.resolve(DeleteAllUsersUseCase);

    await deleteAllUsersUseCase.execute();

    return response.status(204).send();
  }
}
