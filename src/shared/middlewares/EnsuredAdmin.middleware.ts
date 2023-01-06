import { NextFunction, Request, Response } from "express";

export class EnsuredAdmin {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { type } = request.user;
    if (type !== "ADMIN") {
      return response
        .status(403)
        .json({ error: "Você não tem permissão para acessar esse recurso" });
    }
    next();
  }
}
