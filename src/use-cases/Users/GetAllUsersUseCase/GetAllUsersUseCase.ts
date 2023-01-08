import { inject, injectable } from "tsyringe";
import formatDate from "../../../helpers/FormatDate";
import { IUsersRepository } from "../../../repositories/UsersRepository";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute() {
    const users = await this.usersRepository.getAll();
    const usersformated = users.map((user) => {
      user.updatedAt = formatDate(user.updatedAt as Date);
      return user;
    });
    return usersformated;
  }
}
