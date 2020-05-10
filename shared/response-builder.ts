import * as Res from './api-response';
import { ApiResponse, IErrorResponseBody } from './api.interfaces';
import { ErrorCode } from './error-codes';
import {
  BadRequestResult,
  ErrorResult,
  ForbiddenResult,
  InternalServerErrorResult,
  NotFoundResult,
  UnAuthorizedResult
} from './errors';
import { HttpStatusCode } from './http-status-codes';
/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  private static _returnAs<T>(result: T, statusCode: number): any {
    const bodyObject: IErrorResponseBody | T =
      result instanceof ErrorResult ? { error: result } : result;
    const response = {
      body: bodyObject,
      headers: {
        'Access-Control-Allow-Origin': '*'
        // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode
    };

    return response;
  }
  public static badRequest(code: string, description: string): ApiResponse {
    const errorResult: BadRequestResult = new BadRequestResult(code, description);
    return ResponseBuilder._returnAs<BadRequestResult>(errorResult, +HttpStatusCode.BadRequest);
  }

  public static unAuthorized(code: string, description: string): ApiResponse {
    const errorResult: UnAuthorizedResult = new UnAuthorizedResult(code, description);
    return ResponseBuilder._returnAs<UnAuthorizedResult>(errorResult, +HttpStatusCode.UnAuthorized);
  }

  public static forbidden(code: string, description: string): ApiResponse {
    const errorResult: ForbiddenResult = new ForbiddenResult(code, description);
    return ResponseBuilder._returnAs<ForbiddenResult>(errorResult, +HttpStatusCode.Forbidden);
  }

  public static internalServerError(error: Error): ApiResponse {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(
      ErrorCode.GeneralError,
      'Sorry...'
    );
    return ResponseBuilder._returnAs<InternalServerErrorResult>(
      errorResult,
      +HttpStatusCode.InternalServerError
    );
  }

  public static notFound(code: string, description: string): ApiResponse {
    const errorResult: NotFoundResult = new NotFoundResult(code, description);
    return ResponseBuilder._returnAs<NotFoundResult>(errorResult, +HttpStatusCode.NotFound);
  }

  public static ok<T>(result: T): ApiResponse {
    return ResponseBuilder._returnAs<T>(result, +HttpStatusCode.Ok);
  }

  public static build<T>(response: Res.ApiResponse<T>) {
    if (response.getStatus() === HttpStatusCode.BadRequest) {
      return this.badRequest(response.getStatus(), response.getMessage());
    } else if (response.getStatus() === HttpStatusCode.UnAuthorized) {
      return this.unAuthorized(response.getStatus(), response.getMessage());
    } else if (response.getStatus() === HttpStatusCode.Forbidden) {
      return this.forbidden(response.getStatus(), response.getMessage());
    } else if (response.getStatus() === HttpStatusCode.NotFound) {
      return this.notFound(response.getStatus(), response.getMessage());
    } else {
      return this.ok(response);
    }
  }

  public static buildResponse<T>(response: Res.IApiResponse<T>) {
    if (response.status === HttpStatusCode.BadRequest) {
      return this.badRequest(response.status, response.message ? response.message : '');
    } else if (response.status === HttpStatusCode.UnAuthorized) {
      return this.unAuthorized(response.status, response.message ? response.message : '');
    } else if (response.status === HttpStatusCode.Forbidden) {
      return this.forbidden(response.status, response.message ? response.message : '');
    } else if (response.status === HttpStatusCode.NotFound) {
      return this.notFound(response.status, response.message ? response.message : '');
    } else {
      return this.ok(response);
    }
  }
}
