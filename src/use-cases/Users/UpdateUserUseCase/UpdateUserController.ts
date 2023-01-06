import { hash } from "bcrypt";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.user.id as string;
    const data = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    if (data.password) data.password = await hash(data.password, 8);

    try {
      const updatedUser = await updateUserUseCase.execute({
        id,
        data,
      });
      return response.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
