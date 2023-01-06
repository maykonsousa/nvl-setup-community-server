import { inject, injectable } from "tsyringe";
import {
  IDataUserModel,
  IUsersRepository,
} from "../../../repositories/UsersRepository";

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IDataUserModel> {
    if (!id) {
      throw new Error("Id is required");
    }

    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
