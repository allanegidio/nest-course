import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly service: UsersService
  ) { }

  //async intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session || {}

    if(userId) {
      const user = await this.service.findOne(userId)
      request.currentUser = user
    }

    return next.handle()
  } 
}