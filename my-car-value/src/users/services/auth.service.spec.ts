import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util"
import { User } from "../entities/user.entity"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"

const scrypt = promisify(_scrypt)

describe('Unit Test - AuthService', () => {
  let authService: AuthService

  const users: User[] = []

  const fakeUsersService: Partial<UsersService> = {
    find: (email: string) => {
      const filteredUsers = users.filter(user => user.email === email)
      return Promise.resolve(filteredUsers)
    },
    create: (email: string, password: string) => {
      const user = { id: Math.floor(Math.random() * 999999), email, password } as User
      users.push(user)

      return Promise.resolve(user)
    }
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }]
    }).compile()

    authService = module.get(AuthService)
  })

  it('Shoul be defined Auth Service', async () => {
    expect(authService).toBeDefined()
  })

  it('should create a new user with a salted and hashed password', async () => {
    const user = await authService.signup('allan.egidio@outlook.com', 'asdf')
    const [salt, hash] = user.password.split('.')

    expect(user.password).not.toEqual('asdf')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('Should return user when try sign in', async () => {
    await authService.signup('test_return@outlook.com',  'Contract me!')
    
    const result = await authService.signin('test_return@outlook.com',  'Contract me!')

    expect(result).toBeDefined()
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await authService.signup('already_exists@outlook.com', 'Contract me!')

    expect(authService.signup('already_exists@outlook.com', 'Contract me!')).rejects.toBeInstanceOf(BadRequestException);
  })

  it('throws if user not found when try sign-in', () => {
    expect(authService.signin('doent_exists@outlook.com', 'Contract me!')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await authService.signup('wrong_password@outlook.com', 'Contract me!')

    expect(authService.signin('wrong_password@outlook.com', 'Wrong password')).rejects.toBeInstanceOf(BadRequestException);
  });
})