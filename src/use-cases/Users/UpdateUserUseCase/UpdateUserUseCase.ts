import axios from "axios";
import { inject, injectable } from "tsyringe";
import {
  IDataUserModel,
  IUsersRepository,
} from "../../../repositories/UsersRepository";

interface IUpdateUserRequest {
  id: string;
  data: {
    fullName?: string;
    githubProfile?: string;
    linkedinProfile?: string;
    rocketseatProfile: string;
    countIndication?: number;
    password?: string;
  };
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, data }: IUpdateUserRequest): Promise<IDataUserModel> {
    const {
      fullName,
      githubProfile,
      linkedinProfile,
      rocketseatProfile,
      password,
    } = data;

    if (!id) throw new Error("Usuário não informado");

    const userAlreadyExists = await this.usersRepository.getById(id);
    if (!userAlreadyExists) throw new Error("Usuário não existe");

    const url = `https://skylab-api.rocketseat.com.br/public/event/nlw-setup/referral/${userAlreadyExists.username}`;

    const { totalCount } = await axios
      .get(url)
      .then((response) => response.data)
      .catch(() => null);

    const updatedUser = await this.usersRepository.update({
      id,
      data: {
        fullName,
        githubProfile,
        linkedinProfile,
        rocketseatProfile,
        countIndication: totalCount,
        password,
      },
    });

    return updatedUser;
  }
}
