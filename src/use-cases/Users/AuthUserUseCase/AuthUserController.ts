import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthUserUseCase } from "./AuthUserUseCase";

interface IRequest {
  username: string;
  password: string;
}

export class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password }: IRequest = request.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    try {
      const loginData = await authUserUseCase.execute(username, password);

      return response.status(200).json(loginData);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Unknown error" });
    }
  }
}
