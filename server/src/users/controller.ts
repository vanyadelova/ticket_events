import { JsonController, Body, Post, Get, Param } from 'routing-controllers';
import {User, Customer} from './entity';
import { IsString, IsEmail, MinLength, IsOptional, IsNumberString } from 'class-validator';

class validUser {

  @IsOptional()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumberString()
  pnoneNumber: string;
  
  @IsString()
  @MinLength(8)
  password: string;
}

@JsonController()
export default class UserController {
  
  @Post('/users')
  async createUser(
  @Body() data: validUser
  ) {
      const {password, ...rest} = data;
      const entity = User.create(rest);
      await entity.setPassword(password);
      const user  = await entity.save();

      await Customer.create({user, userName: `${user.name} ${user.lastName}`}).save();
      return user;
  }

  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOneById(id);
  }

  @Get('/users')
  allUsers() {
    return User.find();
  }
}
