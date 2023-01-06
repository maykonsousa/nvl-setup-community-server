import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

export class GetUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id || request.user.id;
    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

    try {
      const user = await getUserByIdUseCase.execute(`${id}`);
      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Unknown error" });
    }
  }
}
