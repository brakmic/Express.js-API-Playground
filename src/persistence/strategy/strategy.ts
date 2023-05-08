import { IUserData, IUser } from "../models";

export interface IDbStrategy {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  createRandomUsers(amount: number): Promise<void>;
  createManualUser(user: IUser): Promise<IUser>;
  create(user: IUserData): Promise<IUser>;
  findOne(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  update(id: string, userData: IUserData): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}
