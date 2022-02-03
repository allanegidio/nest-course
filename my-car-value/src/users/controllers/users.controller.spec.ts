import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';

describe('Unit Test - UsersController', () => {
  let controller: UsersController
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@asdf.com', password: 'password'} as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'password'} as User])
      },
      // remove: () => {

      // },
      // update: () => {

      // }
    }

    fakeAuthService = {
       signin: (email: string, password: string) => {
         return Promise.resolve({ id: 1 } as User)
       },
      // signup: () => {}
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers return a list of user with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com')

    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('asdf@asdf.com')
  });

  it('findUser return a single user with the given email', async () => {
    const user = await controller.findUser(1)

    expect(user.email).toEqual('asdf@asdf.com')
  });

  it('findUser return a single user with the given email', async () => {
    const user = await controller.findUser(1)

    expect(user.email).toEqual('asdf@asdf.com')
  });

  it('should sigin updates session object and returns user', async () => {
    const session = { userId: undefined }
    const user = await controller.signin({ email: 'asdf@asdf@.com', password: 'password' } as CreateUserDTO, session)

    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  });
});
