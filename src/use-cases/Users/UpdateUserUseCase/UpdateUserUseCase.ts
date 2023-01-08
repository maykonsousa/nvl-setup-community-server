import axios from "axios";
import { inject, injectable } from "tsyringe";
import {
  IDataUserModel,
  IUsersRepository,
} from "../../../repositories/UsersRepository";

import { GetGithubData } from "../../../helpers/GetGithubData";
import formatDate from "../../../helpers/FormatDate";

interface IUpdateUserRequest {
  id: string;
  data: {
    fullName?: string;
    githubProfile?: string;
    linkedinProfile?: string;
    rocketseatProfile?: string;
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

    const { avatarUrl, bio } = await GetGithubData(
      githubProfile || (userAlreadyExists.githubProfile as string)
    );

    console.log(avatarUrl, bio);

    const newUser = {
      ...userAlreadyExists,
      fullName: fullName || userAlreadyExists.fullName,
      githubProfile: githubProfile || userAlreadyExists.githubProfile,
      linkedinProfile: linkedinProfile || userAlreadyExists.linkedinProfile,
      rocketseatProfile:
        rocketseatProfile || userAlreadyExists.rocketseatProfile,
      countIndication: totalCount || userAlreadyExists.countIndication,
      password: password || userAlreadyExists.password,
      avatarUrl,
      bio,
    };

    const updatedUser = await this.usersRepository.update({
      id,
      data: newUser,
    });

    updatedUser.updatedAt = formatDate(updatedUser.updatedAt as Date);

    return updatedUser;
  }
}
