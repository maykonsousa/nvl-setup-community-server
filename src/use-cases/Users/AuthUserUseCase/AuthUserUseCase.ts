import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

interface ILoginResposeData {
  token: string;
  userIformations: {
    id: string;
    type: string;
    username: string;
    fullName: string;
    countIndication: number;
    githubProfile?: string;
    linkedinProfile?: string;
    rocketseatProfile?: string;
    avatarUrl?: string;
    bio?: string;
    updatedAt: Date;
  };
}

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    username: string,
    password: string
  ): Promise<ILoginResposeData> {
    const secret = `${process.env.JWT_SECRET}`;
    const expiresIn = `${process.env.JWT_EXPIRES_IN}`;
    //username not provided
    if (!username || !password) {
      throw new Error("Usuário e senha são obrigatórios");
    }

    //get user by username
    const user = await this.usersRepository.getByUsername(username);

    //user not found
    if (!user) {
      throw new Error("usuário ou senha incorretos");
    }

    //compare password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("usuário ou senha incorretos");
    }

    //generate token
    const token = sign(
      {
        username: user.username,
        id: user.id,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      }
    );

    return {
      token,
      userIformations: {
        id: user.id,
        type: user.type,
        username: user.username,
        fullName: user.fullName,
        countIndication: user.countIndication,
        githubProfile: user.githubProfile,
        linkedinProfile: user.linkedinProfile,
        rocketseatProfile: user.rocketseatProfile,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        updatedAt: user.updatedAt,
      },
    };
  }
}
