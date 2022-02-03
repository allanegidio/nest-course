import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/services/users.service";

// Add to Request Interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: User
    }
  }
}

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