import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    @Get()
    list() {

    }

    @Post()
    create(@Body() body: any) {
        console.log(body)
    }

    @Get('/:id')
    get(@Param('id') id: string) {
        console.log(id)
    }
}
