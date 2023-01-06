import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username,
      fullName,
      password,
      githubProfile,
      linkedinProfile,
      rocketseatProfile,
    } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    try {
      const user = await createUserUseCase.execute({
        username,
        fullName,
        password,
        githubProfile,
        linkedinProfile,
        rocketseatProfile,
      });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Unknown error" });
    }
  }
}
