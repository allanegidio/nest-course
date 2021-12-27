import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from '../dtos/create-message.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly service: MessagesService
  ) { }

  @Get()
  list() {
    return this.service.findAll()

  }

  @Post()
  create(@Body() body: CreateMessageDTO) {
    return this.service.create(body.content)
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    const message = this.service.findOne(id)

    if(!message)
      return new NotFoundException()

    return message
  }
}
