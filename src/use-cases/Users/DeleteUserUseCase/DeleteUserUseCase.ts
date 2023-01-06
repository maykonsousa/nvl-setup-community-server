import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../repositories/UsersRepository";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error("Usuário não informado");

    const userAlreadyExists = await this.userRepository.getById(id);
    if (!userAlreadyExists) throw new Error("Usuário não existe");

    await this.userRepository.delete(id);
  }
}
