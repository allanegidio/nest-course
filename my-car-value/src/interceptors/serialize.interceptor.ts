import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";


export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by tge request handler

    return next.handle().pipe(
      map((data:any) => {
        // Run something before the response is sent out
        return plainToInstance(this.dto, data, { excludeExtraneousValues: true })
      })
    )
  }
}