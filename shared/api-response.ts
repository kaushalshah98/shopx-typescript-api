import { HttpStatusCode } from './http-status-codes';

/**
 *  @deprecated ApiResponseResult class should be deprecated and needs to use IApiResponse interface
 */
// tslint:disable: typedef
export class ApiResponseResult<T> {
  private status: string = HttpStatusCode.Ok;
  private message = '';
  private messageCode = '';
  private totalCount = 0;
  private offset = 0;
  private limit = 0;
  private result: T | undefined;

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  public getMessageCode(): string {
    return this.messageCode;
  }

  public setMessageCode(messageCode: string) {
    this.messageCode = messageCode;
    return this;
  }

  public getTotalCount(): number {
    return this.totalCount;
  }

  public setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
    return this;
  }

  public getOffset(): number {
    return this.offset;
  }

  public setOffset(offset: number) {
    this.offset = offset;
    return this;
  }

  public getLimit(): number {
    return this.limit;
  }

  public setLimit(limit: number) {
    this.limit = limit;
    return this;
  }

  public getResult(): T | undefined {
    return this.result;
  }

  public setResult(result: T | undefined) {
    this.result = result;
    return this;
  }
}

export interface IApiResponse<T> {
  status: string;
  message?: string | undefined;
  messageCode?: string | undefined;
  totalCount?: number;
  offset?: number | undefined;
  limit?: number | undefined;
  result?: T | undefined;
}
