import { IUser, IUserData, User } from "../models";
import { createDbStrategy } from "../strategy";
import { IDbStrategy } from "../strategy/strategy";

export class Db {
  private static instance: Db;
  static strategy: IDbStrategy;

  private constructor() {}

  static async init() {
    Db.strategy = createDbStrategy();
    await Db.strategy.connect();
  }

  static getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  async create(user: IUserData): Promise<User> {
    return Db.strategy.create(user);
  }

  async createManual(user: IUser): Promise<User> {
    return Db.strategy.createManualUser(user);
  }

  async createRandom(amount: number) {
    return Db.strategy.createRandomUsers(amount);
  }

  async findAll(): Promise<User[]> {
    return Db.strategy.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return Db.strategy.findOne(id);
  }

  async update(id: string, userData: IUserData): Promise<User | null> {
    return Db.strategy.update(id, userData);
  }

  async remove(id: string): Promise<boolean> {
    return Db.strategy.delete(id);
  }
}
