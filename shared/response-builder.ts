import * as Res from './api-response';
import { ApiResponse, IErrorResponseBody } from './api.interfaces';
import {
  BadRequestResult,
  ErrorResult,
  ForbiddenResult,
  InternalServerErrorResult,
  NoContentResult,
  NotFoundResult,
  UnAuthorizedResult
} from './errors';
import { HttpStatusCode } from './http-status-codes';
/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  private static _returnAs<T>(result: T, statusCode: number): any {
    const bodyObject: IErrorResponseBody | T = result instanceof ErrorResult ? result : result;
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

  private static badRequest(message: string, messageCode: string): ApiResponse {
    const errorResult: BadRequestResult = new BadRequestResult(
      HttpStatusCode.BadRequest,
      message,
      messageCode
    );
    return ResponseBuilder._returnAs<BadRequestResult>(errorResult, +HttpStatusCode.BadRequest);
  }

  private static unAuthorized(message: string, messageCode: string): ApiResponse {
    const errorResult: UnAuthorizedResult = new UnAuthorizedResult(
      HttpStatusCode.UnAuthorized,
      message,
      messageCode
    );
    return ResponseBuilder._returnAs<UnAuthorizedResult>(errorResult, +HttpStatusCode.UnAuthorized);
  }

  private static forbidden(message: string, messageCode: string): ApiResponse {
    const errorResult: ForbiddenResult = new ForbiddenResult(
      HttpStatusCode.Forbidden,
      message,
      messageCode
    );
    return ResponseBuilder._returnAs<ForbiddenResult>(errorResult, +HttpStatusCode.Forbidden);
  }

  private static internalServerError(message: string, messageCode: string): ApiResponse {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(
      HttpStatusCode.InternalServerError,
      `Couchbase Connection Error ::${message}`,
      messageCode
    );
    return ResponseBuilder._returnAs<InternalServerErrorResult>(
      errorResult,
      +HttpStatusCode.InternalServerError
    );
  }

  private static notFound(message: string, messageCode: string): ApiResponse {
    const errorResult: NotFoundResult = new NotFoundResult(
      HttpStatusCode.NotFound,
      message,
      messageCode
    );
    return ResponseBuilder._returnAs<NotFoundResult>(errorResult, +HttpStatusCode.NotFound);
  }

  private static noContent(message: string, messageCode: string): ApiResponse {
    const errorResult: NoContentResult = new NoContentResult(
      HttpStatusCode.NoContent,
      message,
      messageCode
    );
    return ResponseBuilder._returnAs<NoContentResult>(errorResult, +HttpStatusCode.NoContent);
  }

  private static ok<T>(result: T): ApiResponse {
    return ResponseBuilder._returnAs<T>(result, +HttpStatusCode.Ok);
  }

  private static created<T>(result: T): ApiResponse {
    return ResponseBuilder._returnAs<T>(result, +HttpStatusCode.Created);
  }

  /**
   *  @deprecated build method should be deprecated and needs to use buildResponse method
   */
  public static build<T>(response: Res.ApiResponseResult<T>) {
    if (response.getStatus() === HttpStatusCode.BadRequest) {
      return this.badRequest(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.UnAuthorized) {
      return this.unAuthorized(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.Forbidden) {
      return this.forbidden(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.NotFound) {
      return this.notFound(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.InternalServerError) {
      return this.internalServerError(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.NoContent) {
      return this.noContent(response.getMessage(), response.getStatus());
    } else if (response.getStatus() === HttpStatusCode.Created) {
      return this.created(response);
    } else {
      return this.ok(response);
    }
  }

  public static buildResponse<T>(response: Res.IApiResponse<T>) {
    if (response.status === HttpStatusCode.BadRequest) {
      return this.badRequest(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.UnAuthorized) {
      return this.unAuthorized(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.Forbidden) {
      return this.forbidden(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.NotFound) {
      return this.notFound(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.InternalServerError) {
      return this.internalServerError(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.NoContent) {
      return this.noContent(
        response.message ? response.message : '',
        response.messageCode ? response.messageCode : ''
      );
    } else if (response.status === HttpStatusCode.Created) {
      return this.created(response);
    } else {
      return this.ok(response);
    }
  }
}
