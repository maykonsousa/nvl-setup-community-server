import axios from "axios";
import { inject, injectable } from "tsyringe";
import {
  IDataUserModel,
  IUsersRepository,
} from "../../../repositories/UsersRepository";

@injectable()
export class UpdateAllCountUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IDataUserModel[]> {
    const users = await this.usersRepository.getAll();
    const usersUpdated = await Promise.all(
      users.map(async (user) => {
        const url = `https://skylab-api.rocketseat.com.br/public/event/nlw-setup/referral/${user.username}`;
        const { totalCount } = await axios
          .get(url)
          .then((response) => response.data);

        return {
          ...user,
          countIndication: totalCount,
        };
      })
    );

    await this.usersRepository.updateAll(usersUpdated);
    return usersUpdated;
  }
}
