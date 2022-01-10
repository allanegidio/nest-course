import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  create(email: string, password: string) {
    const user = this.repository.create({ email, password })
    
    return this.repository.save(user)
  }

  find(email: string) {
    return this.repository.find({ email })
  }

  findOne(id: number) {
    return this.repository.findOne(id)
  }

  async update(id: number, props: Partial<User>) {
    const user = await this.repository.findOne(id)
    
    if(!user)
      throw new Error('user not found')

    Object.assign(user, props)

    return this.repository.save(user)
  }

  async remove(id: number) {
    const user = await this.repository.findOne(id)

    if(!user)
      throw new Error('user not found')
    
    return this.repository.remove(user)
  }
}
