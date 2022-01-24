import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { User } from './user.entity';

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

  @Get('/currentUser')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id)
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)

    session.userId = user.id
    
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)

    session.userId = user.id
    
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
