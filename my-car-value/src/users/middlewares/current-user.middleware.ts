import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

// Add to Request Interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: User
    }
  }
}

@Injectable()
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