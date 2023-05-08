import { JsonController, Get, Delete, Post, Body, Param } from 'routing-controllers';
import { Db, UserData } from '../../persistence';
import { ResponseSchema } from 'routing-controllers-openapi';
import { UserDeletedResponse, UserOrErrorResponse, UserResponse, UsersResponse } from './responses';

@JsonController('/users')
export class UsersController {
  private db: Db;

  constructor() {
    this.db = Db.getInstance();
  }

  @Get('/')
  @ResponseSchema(UsersResponse)
  async get(): Promise<UsersResponse> {
    return Promise.resolve({ users: await this.db.findAll() });
  }

  @Get('/:id')
  @ResponseSchema(UserResponse)
  async getById(@Param('id') id: string): Promise<UserResponse> {
    return Promise.resolve({ user: await this.db.findOne(id) });
  }

  @Post('/')
  @ResponseSchema(UserOrErrorResponse)
  async post(@Body() user: UserData): Promise<UserOrErrorResponse> {
    return Promise.resolve({ user: await this.db.create(user) });
  }

  @Delete('/:id')
  @ResponseSchema(UserDeletedResponse)
  async delete(@Param('id') id: string): Promise<UserDeletedResponse> {
    return Promise.resolve({ id, success: await this.db.remove(id) });
  }
}
