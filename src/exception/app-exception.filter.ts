import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResultModal } from '../common/result';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let message = 'Internal server error';
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();
            message = (typeof response === 'object' && response !== null && 'message' in response)
                ? (response as any).message
                : exception.message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const body = new ResultModal({}, '', status, false, message);
        const { httpAdapter } = this.httpAdapterHost;
        httpAdapter.reply(ctx.getResponse(), body.result, status);
    }
}
