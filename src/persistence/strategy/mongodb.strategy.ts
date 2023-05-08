import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { IUser, IUserData, User } from '../models';
import { IDbStrategy } from './strategy';
import { IUserDocument, UserSchema } from '../vendor/mongodb/user.schema';

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export class MongoDbStrategy implements IDbStrategy {
  private mongoServer!: MongoMemoryServer;

  async connect(): Promise<void> {
    this.mongoServer = new MongoMemoryServer();
    const mongoUri = this.mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    await this.mongoServer.stop();
  }

  async create(user: IUserData): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    const savedUser = await new UserModel(newUser).save();
    return savedUser;
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
      await new UserModel(user).save();
    }
  }

  async createManualUser(user: IUser): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = user.id || faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    const savedUser = await new UserModel(newUser).save();
    return savedUser;
  }

  async findOne(id: string): Promise<IUser | null> {
    return UserModel.findOne({ id });
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find({});
  }

  async update(id: string, userData: IUserData): Promise<IUser | null> {
    return UserModel.findOneAndUpdate({ id }, userData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
