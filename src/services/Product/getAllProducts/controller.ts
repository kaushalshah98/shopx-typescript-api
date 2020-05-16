import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpMessage, HttpStatusCode } from '../../../../shared/http-status-codes';
import { IProductItem } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  private status: string = HttpStatusCode.BadRequest;
  private message: string = HttpMessage.emptyMessage;
  constructor(private service: Service) {}
  public getAllProducts: ApiHandler = app.get(
    '/getallproducts',
    async (req: Request, res: Response) => {
      try {
        const result = await this.service.getAllProducts();
        if (result === null) {
          res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
          return;
        }
        const response: IApiResponse<IProductItem[]> = {
          status: HttpStatusCode.Ok,
          result,
          message: 'Product Fetched successfully'
        };
        res.send(ResponseBuilder.buildResponse(response));
      } catch (error) {
        res.send(ResponseBuilder.buildResponse({ status: this.status, message: error }));
      }
    }
  );
}
