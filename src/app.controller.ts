import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {

    @Get('/test')
    test() {
        return 'Hi There!'
    }

    @Get('/bye')
    getByeThere() {
        return 'Bye there!'
    }
}