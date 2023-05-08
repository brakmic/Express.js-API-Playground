import { Type, Expose } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested, IsBoolean, IsString } from 'class-validator';
import { User } from '../../persistence';

export class UserResponse {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user!: User | null;
}

export class UsersResponse {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  users!: User[] | null;
}

export class UserOrErrorResponse {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user!: User | any;
}

export class UserDeletedResponse {
  @Expose()
  @IsBoolean()
  success!: boolean;
  @Expose()
  @IsString()
  id!: string;
}
