import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

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

  async findOne(id: number) {
    if(!id)
      return null
      
    const user = await this.repository.findOne(id)
    
    if(!user)
      throw new NotFoundException('user not found')

    return user
  }

  async update(id: number, props: Partial<User>) {
    const user = await this.findOne(id)

    Object.assign(user, props)

    return this.repository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    
    return this.repository.remove(user)
  }
}
