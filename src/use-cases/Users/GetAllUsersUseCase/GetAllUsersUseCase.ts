import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../repositories/UsersRepository";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute() {
    const users = await this.usersRepository.getAll();
    return users;
  }
}
