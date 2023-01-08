export interface ICreateUserData {
  username: string;
  fullName: string;
  password: string;
  countIndication?: number;
  githubProfile?: string;
  linkedinProfile?: string;
  rocketseatProfile?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface IUpdateUserData {
  id: string;
  data: {
    fullName?: string;
    githubProfile?: string;
    linkedinProfile?: string;
    rocketseatProfile?: string;
    countIndication?: number;
    password?: string;
    avatarUrl?: string;
    bio?: string;
  };
}

export interface IDataUserModel {
  id: string;
  type: string;
  username: string;
  fullName: string;
  password: string;
  countIndication: number;
  githubProfile?: string;
  linkedinProfile?: string;
  rocketseatProfile?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUsersRepository {
  getByUsername(username: string): Promise<IDataUserModel | null>;
  create(data: ICreateUserData): Promise<IDataUserModel>;
  getAll(): Promise<IDataUserModel[]>;
  getById(id: string): Promise<IDataUserModel | null>;
  update({ id, data }: IUpdateUserData): Promise<IDataUserModel>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  updateAll(users: IDataUserModel[]): Promise<void>;
}
