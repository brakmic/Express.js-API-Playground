import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

class User implements IUser {
  @Expose()
  @IsNotEmpty()
  @IsString()
  id!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName!: string;
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone!: string;
}

class UserData implements IUserData {
  @Expose()
  @IsEmail()
  @IsString()
  email!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName!: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone!: string;

}

export {
  IUser,
  IUserData,
  User,
  UserData
}
