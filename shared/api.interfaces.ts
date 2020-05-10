import { Bucket } from 'couchbase';
import { Request, Response } from 'express';
import { Express } from 'express';
import { ErrorResult } from './errors';

export interface IConnectionObject {
  COUCHBASE_URL: string;
  COUCHBASE_USER: string;
  COUCHBASE_PWD: string;
}
export interface IBody {
  body: string;
}
// Type aliases to hide the 'aws-lambda' package and have consistent, short naming.
// export type ApiCallback = ProxyCallback;
// export type ApiContext = Context;
export type ApiRequest = Request;
export type ApiHandler = Express;
export type ApiResponse = Response;
export interface IBucket extends Bucket {
  _name?: string;
}
export interface IErrorResponseBody {
  error: ErrorResult;
}
