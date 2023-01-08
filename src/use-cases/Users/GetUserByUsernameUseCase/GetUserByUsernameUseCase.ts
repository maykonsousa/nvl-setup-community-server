import { inject, injectable } from "tsyringe";
import formatDate from "../../../helpers/FormatDate";
import { IUsersRepository } from "../../../repositories/UsersRepository";

@injectable()
export class GetUserByUsernameUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(username: string) {
    if (!username) throw new Error("Username is required");
    const user = await this.usersRepository.getByUsername(username);
    if (!user) throw new Error("User not found");

    user.updatedAt = formatDate(user.updatedAt as Date);
    return user;
  }
}
