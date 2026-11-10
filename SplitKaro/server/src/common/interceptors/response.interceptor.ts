import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

// Wraps every successful response as { success: true, data }.
// Empty responses (204 No Content) are left alone.
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data: unknown) => (data === undefined ? data : { success: true, data })));
  }
}
