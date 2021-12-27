import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "../repositories/messages.repository";

@Injectable()
export class MessagesService {
  
  constructor(
    private readonly repository: MessagesRepository
  ) { }

  findOne(id: string) {
    return this.repository.findOne(id)
  }

  findAll() {
    return this.repository.findAll()
  }

  create(content: string) {
    return this.repository.create(content)
  }
}
