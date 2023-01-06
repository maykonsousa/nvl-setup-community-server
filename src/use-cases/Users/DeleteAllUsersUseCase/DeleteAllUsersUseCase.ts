import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../repositories/UsersRepository";

@injectable()
export class DeleteAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<void> {
    await this.usersRepository.deleteAll();
  }
}
