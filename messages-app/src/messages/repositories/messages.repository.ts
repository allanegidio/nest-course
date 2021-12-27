import { Injectable } from '@nestjs/common'
import { readFile, writeFile } from 'fs/promises'

export interface IMessagesRepository {
  findOne(id:string)
  findAll()
  create(content: string)
}

@Injectable()
export class MessagesRepository implements IMessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    return messages[id]
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    return messages
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8')
    const messages = JSON.parse(contents)

    const id = Math.floor(Math.random() * 999)

    messages[id] = { id, content }

    await writeFile('messages.json', JSON.stringify(messages))
  }
}
