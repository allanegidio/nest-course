import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/services/users.service";

export class CurrentUserMiddleware implements NestMiddleware {
  constructor( 
    private readonly service: UsersService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {}

    if (userId) {
      const user = await this.service.findOne(userId)

      req.currentUser = user
    }

    next()
  }
}