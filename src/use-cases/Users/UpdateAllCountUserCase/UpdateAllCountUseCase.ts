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
    //dividir em 3 arrays para não sobrecarregar a api
    const users1 = users.slice(0, 20);
    const users2 = users.slice(20, 40);
    const users3 = users.slice(40, 60);
    const usersUpdated1 = await Promise.all(
      users1.map(async (user) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const usersUpdated2 = await Promise.all(
      users2.map(async (user) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const usersUpdated3 = await Promise.all(
      users3.map(async (user) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
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

    await this.usersRepository.updateAll([
      ...usersUpdated1,
      ...usersUpdated2,
      ...usersUpdated3,
    ]);
    const newUsers = await this.usersRepository.getAll();
    const newUsersReturn = newUsers.map((user) => {
      return {
        ...user,
        updatedAt: formatDate(new Date(user.updatedAt)),
      };
    });
    return {
      updateDate: formatDate(new Date()),
      users: newUsersReturn,
    };
  }
}
