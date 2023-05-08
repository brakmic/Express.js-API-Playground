import Database from 'better-sqlite3';
import { faker } from '@faker-js/faker';
import { IDbStrategy } from './strategy';
import { IUser, IUserData, User } from '../models';

export class SqliteStrategy implements IDbStrategy {
  private db: Database | null = null;

  constructor() {
  }

  async connect(): Promise<void> {
    this.db = await new Promise<Database>((resolve, reject) => {
      try {
        const db = new Database(':memory:');
        resolve(db);
      } catch (err) {
        reject(err);
      }
    });
    this.db.prepare('CREATE TABLE users (id TEXT, firstName TEXT, lastName TEXT, email TEXT, phone TEXT)').run();
  }

  async disconnect(): Promise<void> {
    await this.db.close();
  }

  async create(user: IUserData): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    const stmt = this.db.prepare(`INSERT INTO users (id, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?)`);
    stmt.run(...Object.values(newUser));
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
      const stmt = this.db.prepare(`INSERT INTO users (id, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?)`);
      stmt.run(...Object.values(user));
    }
  }

  async createManualUser(user: IUser): Promise<IUser> {
    const newUser: IUser = new User();
    newUser.id = user.id || faker.datatype.uuid();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phone = user.phone;
    const stmt = this.db.prepare(`INSERT INTO users (id, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?)`, 
    [newUser.id, newUser.firstName, newUser.lastName, newUser.email, newUser.phone])
    await stmt.run(...Object.values(newUser));
    return newUser;
  }

  async findOne(id: string): Promise<IUser | null> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  async findAll(): Promise<IUser[]> {
    const stmt = this.db.prepare('SELECT * FROM users');
    return stmt.all();
  }

  async update(id: string, userData: IUserData): Promise<IUser | null> {
    const stmt = this.db.prepare(`UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?`, 
                      [userData.firstName, userData.lastName, userData.email, userData.phone, id]);
    const result = stmt.run(...Object.values(userData), id);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const stmt = this.db.prepare(`DELETE FROM users WHERE id = ?`);
    return stmt.run(id).changes > 0;
  }
}
