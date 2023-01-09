import axios from "axios";
import { inject, injectable } from "tsyringe";
import formatDate from "../../../helpers/FormatDate";
import {
  IDataUserModel,
  IUsersRepository,
} from "../../../repositories/UsersRepository";

interface IUpdateAllResponse {
  updateDate: string;
  users: IDataUserModel[];
}

@injectable()
export class UpdateAllCountUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IUpdateAllResponse> {
    const users = await this.usersRepository.getAll();
    const usersUpdated = await Promise.all(
      users.map(async (user) => {
        const url = `https://skylab-api.rocketseat.com.br/public/event/nlw-setup/referral/${user.username}`;
        const { totalCount } = await axios
          .get(url)
          .then((response) => response.data);

        const newUser = {
          ...user,
          countIndication: totalCount,
        };

        return newUser;
      })
    );

    await this.usersRepository.updateAll(usersUpdated);
    const newUsers = await this.usersRepository.getAll();
    return {
      updateDate: formatDate(new Date()),
      users: newUsers,
    };
  }
}
