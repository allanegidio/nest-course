import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id)
  }

  @Get('/whoami')
  whoami(@Session() session: any) {
    return this.usersService.findOne(session.userId)
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)

    session.user = user.id
    
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)

    session.user = user.id
    
    return user
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id)
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    return this.usersService.update(id, user)
  }
  
}
