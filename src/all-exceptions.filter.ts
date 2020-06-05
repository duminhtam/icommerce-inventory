import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error = (exception.response && exception.response.message) ? exception.response.message : exception.message;
    // const detailed = (exception instanceof Error) ? exception.message.response : exception.message.error;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error({
      error
    }, exception, 'AllExceptionsFilter')
    const data = {
      status,
      error,
      timestamp: new Date().toISOString(),
      path: request.url
    }

    // console.log(exception.response);
    response.status(status).json(data);
  }
}
