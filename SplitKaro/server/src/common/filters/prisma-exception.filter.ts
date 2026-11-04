import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

// Maps known Prisma errors to proper HTTP responses instead of a generic 500.
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        return res
          .status(HttpStatus.CONFLICT)
          .json({ statusCode: HttpStatus.CONFLICT, message: 'Record already exists' });
      case 'P2025':
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ statusCode: HttpStatus.NOT_FOUND, message: 'Record not found' });
      default:
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Database error' });
    }
  }
}
