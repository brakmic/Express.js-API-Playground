import { faker } from '@faker-js/faker';
import { IUser, User, IUserData } from '../models';
import { IDbStrategy } from './strategy';

export class NoDbStrategy implements IDbStrategy {
  private users: IUser[] = [];

  connect(): Promise<void> {
    return Promise.resolve();
  }

  disconnect(): Promise<void> {
    return Promise.resolve();
  }

  async create(user: IUserData): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    this.users.push(newUser);
    return newUser;
  }

  async createRandomUsers(amount: number): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const user: IUser = new User();
      user.id = faker.datatype.uuid();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.email = faker.helpers.unique(faker.internet.email, [
        user.firstName.toLowerCase(),
        user.lastName.toLowerCase(),
      ]);
      user.phone = faker.phone.number();
      this.users.push(user);
    }
  }

  async createManualUser(user: IUser): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = user.id || faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    this.users.push(newUser);
    return newUser;
  }

  async findOne(id: string): Promise<IUser | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async update(id: string, userData: IUserData): Promise<IUser | null> {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.phone = userData.phone;
      return user;
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
