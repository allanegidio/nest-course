import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly service: UsersService
  ) { }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.service.find(email)
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.service.findOne(id)
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDTO) {
    this.service.create(body.email, body.password)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.service.remove(id)
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    return this.service.update(id, user)
  }
  
}
