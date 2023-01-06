import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { GetUserByIdUseCase } from "../../use-cases/Users/GetUserByIdUseCase/GetUserByIdUseCase";

interface IPayload {
  sub: string;
}

export class EnsuredAuthenticatedMiddleware {
  async handle(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

    try {
      if (!authHeader) {
        throw new Error("Token missing");
      }

      const [, token] = authHeader.split(" ");
      const { sub: user_id } = verify(
        token,
        `${process.env.JWT_SECRET}`
      ) as IPayload;

      if (!user_id) {
        throw new Error("Token invalid");
      }

      const user = await getUserByIdUseCase.execute(user_id);

      request.user = {
        id: user_id,
        type: user.type,
      };

      return next();
    } catch (err) {
      if (err instanceof Error) {
        return response.status(401).json({ error: err.message });
      }
      return response.status(500).json({ error: "Unknown Login Error" });
    }
  }
}
