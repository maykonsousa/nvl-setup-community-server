import axios from "axios";
import { inject, injectable } from "tsyringe";
import {
  IDataUserModel,
  ICreateUserData,
  IUsersRepository,
} from "../../../repositories/UsersRepository";
import { hash } from "bcrypt";
import { GetGithubData } from "../../../helpers/GetGithubData";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    username,
    fullName,
    password,
    githubProfile,
    linkedinProfile,
    rocketseatProfile,
  }: ICreateUserData): Promise<IDataUserModel> {
    if (!username) throw new Error("Usuário não informado");
    if (!fullName) throw new Error("Nome não informado");

    const userAlreadyExists = await this.usersRepository.getByUsername(
      username
    );

    const url = `https://skylab-api.rocketseat.com.br/public/event/nlw-setup/referral/${username}`;

    const userIsValid = await axios
      .get(url)
      .then((response) => response.data)
      .catch(() => null);

    if (userAlreadyExists) throw new Error("Usuário já existe");
    if (!userIsValid) throw new Error("Usuário inválido");

    const passwordHash = await hash(password, 8);
    const updatedCountIndication = userIsValid.totalCount;
    const { avatarUrl, bio } = await GetGithubData(githubProfile as string);
    const user = await this.usersRepository.create({
      username,
      fullName,
      password: passwordHash,
      countIndication: updatedCountIndication,
      githubProfile,
      linkedinProfile,
      rocketseatProfile,
      avatarUrl,
      bio,
    });
    return user;
  }
}
