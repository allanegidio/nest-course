import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"

describe('Unit Test - Auth Service', () => {
  let authService: AuthService

  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) => Promise.resolve({ id: 1, email, password })
  }

  beforeAll(async () => {
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
})