import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from '../dtos/create-message.dto';

@Controller('messages')
export class MessagesController {

    @Get()
    list() {

    }

    @Post()
    create(@Body() body: CreateMessageDTO) {
        console.log(body)
    }

    @Get('/:id')
    get(@Param('id') id: string) {
        console.log(id)
    }
}
