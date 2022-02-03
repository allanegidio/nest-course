import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const fakeUsersRepository: Partial<Repository<User>> = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeUsersRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create a new user', async () => {
    fakeUsersRepository.create = jest.fn().mockReturnValue({ email: "test@email.com", password: "salt.hash"} as User)
    fakeUsersRepository.save = jest.fn().mockReturnValue({ id: 1, email: "test@email.com", password: "salt.hash"} as User)

    const user = await service.create("test@email.com", "salt.hash");

    expect(user).toBeDefined();
    expect(user.email).toEqual("test@email.com");
    expect(fakeUsersRepository.create).toBeCalledWith({ email: "test@email.com", password: "salt.hash"} as User)
    expect(fakeUsersRepository.save).toBeCalledWith({ email: "test@email.com", password: "salt.hash"} as User)
  })
});
