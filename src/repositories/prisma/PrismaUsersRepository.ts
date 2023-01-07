import { PrismaClient } from "@prisma/client";
import {
  ICreateUserData,
  IDataUserModel,
  IUsersRepository,
  IUpdateUserData,
} from "../UsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateUserData): Promise<IDataUserModel> {
    const user = await this.prisma.users.create({
      data,
    });

    return user as IDataUserModel;
  }

  async getByUsername(username: string): Promise<IDataUserModel | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        username,
      },
    });

    return user as IDataUserModel;
  }

  async getAll(): Promise<IDataUserModel[]> {
    const users = await this.prisma.users.findMany();

    return users as IDataUserModel[];
  }

  async getById(id: string): Promise<IDataUserModel | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        id,
      },
    });

    return user as IDataUserModel;
  }

  async update({ id, data }: IUpdateUserData): Promise<IDataUserModel> {
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data,
    });

    return user as IDataUserModel;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }

  async deleteAll(): Promise<void> {
    await this.prisma.users.deleteMany({});
  }

  async updateAll(users: IDataUserModel[]): Promise<void> {
    const newUsers = users.map(async (user) => {
      await this.prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          countIndication: user.countIndication,
        },
      });
    });

    await Promise.all(newUsers);
  }
}
