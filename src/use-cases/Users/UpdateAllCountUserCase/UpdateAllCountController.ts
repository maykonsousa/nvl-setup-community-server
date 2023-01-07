import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAllCountUseCase } from "./UpdateAllCountUseCase";

export class UpdateAllCountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateAllCountUseCase = container.resolve(UpdateAllCountUseCase);
    try {
      const allUsers = await updateAllCountUseCase.execute();
      return res.status(200).json(allUsers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
