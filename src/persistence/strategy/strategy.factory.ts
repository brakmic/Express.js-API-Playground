import { MongoDbStrategy } from "./mongodb.strategy";
import { NoDbStrategy } from "./no-db.strategy";
import { SqliteStrategy } from "./sqlite.strategy";
import { IDbStrategy } from "./strategy";


export const createDbStrategy = (): IDbStrategy => {
  switch (process.env.DB_STRATEGY) {
    case 'mongodb':
      return new MongoDbStrategy();
    case 'sqlite':
      return new SqliteStrategy();
    case 'nodb':
    default:
      return new NoDbStrategy();
  }
}
